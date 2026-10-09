"use client";

import { useEffect, useRef, useState } from "react";
import paths from "@/lib/logo-paths.json";
import { Mark } from "./Logo";

// The Devlonic mark, extruded in Three.js from the traced logo path.
// One orchestrated moment: on load it turns into view and gains depth.
// After that it only answers the pointer and the scroll.
// Falls back to the flat SVG mark when WebGL is unavailable or motion is reduced.
export function HeroMark3D({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { SVGLoader } = await import("three/addons/loaders/SVGLoader.js");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        return; // no WebGL: keep the SVG fallback
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      // No filmic tone mapping: it pushes the brand orange toward crimson.
      renderer.toneMapping = THREE.NoToneMapping;
      el.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 0, 11);

      // Geometry from the traced mark path (SVG y points down, so flip it).
      const m = paths.markOnly;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${m.w} ${m.h}"><path d="${m.d}"/></svg>`;
      const data = new SVGLoader().parse(svg);
      const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
      const depth = 170;
      const geo = new THREE.ExtrudeGeometry(shapes, {
        depth,
        bevelEnabled: true,
        bevelThickness: 14,
        bevelSize: 10,
        bevelSegments: 4,
        curveSegments: 8,
      });
      geo.center();
      const s = 3.6 / m.h; // ~3.6 world units tall
      geo.scale(s, -s, s);

      // A little emissive keeps the face reading as true #E94B27; lights shape the bevels and sides.
      const brand = new THREE.Color("#E94B27");
      const mat = new THREE.MeshStandardMaterial({ color: brand, emissive: brand, emissiveIntensity: 0.38, roughness: 0.5, metalness: 0 });
      const mesh = new THREE.Mesh(geo, mat);
      const pivot = new THREE.Group();
      pivot.add(mesh);
      scene.add(pivot);

      scene.add(new THREE.HemisphereLight(0xffffff, 0x220800, 0.9));
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(-3, 4, 8);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xffc2ad, 1.4);
      rim.position.set(6, -1, -3);
      scene.add(rim);

      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const pointer = { x: 0, y: 0 };
      const tilt = { x: 0, y: 0 };
      const base = { ry: -0.42, rx: 0.08 };
      const onPointer = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };

      let visible = true;
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
      io.observe(el);

      const render = () => renderer.render(scene, camera);

      if (reduce) {
        pivot.rotation.set(base.rx, base.ry, 0);
        render();
        setReady(true);
        cleanup = () => {
          ro.disconnect(); io.disconnect();
          geo.dispose(); mat.dispose(); renderer.dispose(); renderer.domElement.remove();
        };
        return;
      }

      // Intro: from edge-on and paper-thin to a turned, solid mark.
      pivot.rotation.set(0.25, -1.45, 0);
      mesh.scale.set(1, 1, 0.02);
      pivot.position.y = -0.3;
      const intro = gsap.timeline({ delay: 0.15 });
      intro
        .to(pivot.rotation, { x: base.rx, y: base.ry, duration: 1.9, ease: "expo.out" }, 0)
        .to(mesh.scale, { z: 1, duration: 1.5, ease: "power3.out" }, 0.1)
        .to(pivot.position, { y: 0, duration: 1.6, ease: "expo.out" }, 0);

      // Scroll: the mark turns away and drifts up as the hero leaves.
      const scrollState = { turn: 0, lift: 0 };
      const st = ScrollTrigger.create({
        trigger: el.closest("section") ?? el,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self) => {
          scrollState.turn = self.progress * 1.1;
          scrollState.lift = self.progress * 1.4;
        },
      });

      window.addEventListener("pointermove", onPointer, { passive: true });
      setReady(true);

      const tick = () => {
        if (!visible || document.hidden) return;
        tilt.x += (pointer.y * 0.18 - tilt.x) * 0.05;
        tilt.y += (pointer.x * 0.35 - tilt.y) * 0.05;
        if (!intro.isActive()) {
          pivot.rotation.x = base.rx + tilt.x;
          pivot.rotation.y = base.ry + tilt.y + scrollState.turn;
          pivot.position.y = scrollState.lift;
        }
        render();
      };
      gsap.ticker.add(tick);

      cleanup = () => {
        gsap.ticker.remove(tick);
        intro.kill(); st.kill();
        window.removeEventListener("pointermove", onPointer);
        ro.disconnect(); io.disconnect();
        geo.dispose(); mat.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    // The caller supplies positioning (e.g. "absolute ..."); default to relative.
    <div ref={host} className={className || "relative"}>
      {/* Static fallback, hidden once the 3D scene is running */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`}
        aria-hidden="true"
      >
        <Mark className="h-[55%] w-auto" />
      </div>
    </div>
  );
}
