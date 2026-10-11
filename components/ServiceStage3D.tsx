"use client";

import { useEffect, useRef, useState } from "react";

// One Three.js stage with an original model per service. The active model
// swaps when `active` changes; visitors can drag to spin it. Each model is
// built the first time it is shown, so a page can hold several stages that
// each show one model. Renders only while on screen. Reduced motion: no idle
// animation, instant swaps.

type Api = { show: (slug: string) => void; dispose: () => void };

export function ServiceStage3D({
  active,
  label,
  className = "",
  showLabel = true,
}: {
  active: string;
  label: string;
  className?: string;
  showLabel?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<Api | null>(null);
  const activeRef = useRef(active);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    activeRef.current = active;
    api.current?.show(active);
  }, [active]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    const start = () => {
      (async () => {
        const THREE = await import("three");
        const { RoundedBoxGeometry } = await import("three/addons/geometries/RoundedBoxGeometry.js");
        const { gsap } = await import("gsap");
        if (disposed) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let renderer: import("three").WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch {
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;touch-action:pan-y;cursor:grab;";
        renderer.domElement.setAttribute("aria-hidden", "true");
        el.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
        camera.position.set(0, 0.2, 9.5);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x221008, 1.0));
        const key = new THREE.DirectionalLight(0xffffff, 1.7);
        key.position.set(-3, 5, 7);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xffc2ad, 1.3);
        rim.position.set(5, -1, -4);
        scene.add(rim);

        // Materials
        const brand = new THREE.Color("#E94B27");
        const orange = new THREE.MeshStandardMaterial({ color: brand, emissive: brand, emissiveIntensity: 0.32, roughness: 0.5 });
        const ink = new THREE.MeshStandardMaterial({ color: "#1b1b1b", roughness: 0.45, metalness: 0.15 });
        const paper = new THREE.MeshStandardMaterial({ color: "#f3f3f1", roughness: 0.6 });
        const line = new THREE.MeshStandardMaterial({ color: "#cfcfcc", roughness: 0.7 });
        const glass = new THREE.MeshStandardMaterial({ color: "#ffffff", transparent: true, opacity: 0.22, roughness: 0.1 });
        const geos: import("three").BufferGeometry[] = [];
        const mats: import("three").Material[] = [orange, ink, paper, line, glass];

        const rbox = (w: number, h: number, d: number, r: number, mat: import("three").Material) => {
          const g = new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2, h / 2, d / 2));
          geos.push(g);
          return new THREE.Mesh(g, mat);
        };
        const at = <T extends import("three").Object3D>(o: T, x: number, y: number, z: number) => (o.position.set(x, y, z), o);

        type Model = { group: import("three").Group; tick?: (t: number) => void };
        const models: Record<string, Model> = {};
        const builders: Record<string, () => Model> = {};

        // Lead generation: a phone whose call button sends out rings.
        builders["lead-generation-websites"] = () => {
          const g = new THREE.Group();
          g.add(rbox(1.6, 3.1, 0.2, 0.2, ink));
          g.add(at(rbox(1.42, 2.84, 0.04, 0.12, paper), 0, 0, 0.1));
          g.add(at(rbox(1.15, 0.22, 0.04, 0.05, orange), 0, 1.05, 0.13));
          [0.72, 0.56, 0.4].forEach((y, i) => g.add(at(rbox(i === 0 ? 1.1 : 0.85, 0.08, 0.03, 0.02, line), i === 0 ? 0 : -0.12, y, 0.13)));
          const btnGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.1, 40);
          geos.push(btnGeo);
          const btn = at(new THREE.Mesh(btnGeo, orange), 0, -0.6, 0.16);
          btn.rotation.x = Math.PI / 2;
          g.add(btn);
          const ringGeo = new THREE.TorusGeometry(0.42, 0.025, 8, 48);
          geos.push(ringGeo);
          const rings = [0, 1, 2].map(() => {
            const m = orange.clone();
            m.transparent = true;
            mats.push(m);
            const r = at(new THREE.Mesh(ringGeo, m), 0, -0.6, 0.2);
            g.add(r);
            return r;
          });
          return {
            group: g,
            tick: (t) =>
              rings.forEach((r, i) => {
                const p = (t * 0.6 + i / 3) % 1;
                r.scale.setScalar(1 + p * 1.8);
                (r.material as import("three").MeshStandardMaterial).opacity = 1 - p;
              }),
          };
        };

        // Small business websites: a browser window whose layers float apart.
        builders["small-business-websites"] = () => {
          const g = new THREE.Group();
          g.add(rbox(3.4, 2.3, 0.12, 0.12, paper));
          g.add(at(rbox(3.4, 0.32, 0.16, 0.12, ink), 0, 0.99, 0.02));
          [-1.45, -1.27, -1.09].forEach((x, i) => {
            const s = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), i === 0 ? orange : line);
            geos.push(s.geometry);
            g.add(at(s, x, 0.99, 0.12));
          });
          const hero = at(rbox(3.0, 0.72, 0.1, 0.06, orange), 0, 0.35, 0.1);
          const cardA = at(rbox(1.4, 0.62, 0.1, 0.06, ink), -0.8, -0.55, 0.1);
          const cardB = at(rbox(1.4, 0.62, 0.1, 0.06, line), 0.8, -0.55, 0.1);
          g.add(hero, cardA, cardB);
          return {
            group: g,
            tick: (t) => {
              hero.position.z = 0.1 + (Math.sin(t * 1.2) * 0.5 + 0.5) * 0.45;
              cardA.position.z = 0.1 + (Math.sin(t * 1.2 + 1) * 0.5 + 0.5) * 0.3;
              cardB.position.z = 0.1 + (Math.sin(t * 1.2 + 2) * 0.5 + 0.5) * 0.3;
            },
          };
        };

        // Online stores: a shopping bag, a payment card and a parcel.
        builders["online-stores"] = () => {
          const g = new THREE.Group();
          const bag = rbox(1.9, 2.1, 0.95, 0.08, orange);
          g.add(bag);
          const handleGeo = new THREE.TorusGeometry(0.45, 0.065, 12, 40, Math.PI);
          geos.push(handleGeo);
          g.add(at(new THREE.Mesh(handleGeo, ink), 0, 1.05, 0));
          const card = new THREE.Group();
          card.add(rbox(1.35, 0.85, 0.05, 0.07, ink));
          card.add(at(rbox(1.35, 0.15, 0.06, 0.01, orange), 0, 0.18, 0));
          card.add(at(rbox(0.32, 0.22, 0.07, 0.03, paper), -0.38, -0.12, 0));
          at(card, 1.15, -0.45, 0.75);
          card.rotation.set(0.15, -0.5, 0.2);
          const box = at(rbox(0.75, 0.75, 0.75, 0.06, paper), -1.25, -0.75, 0.35);
          g.add(card, box);
          return {
            group: g,
            tick: (t) => {
              card.position.y = -0.45 + Math.sin(t * 1.6) * 0.12;
              card.rotation.y = -0.5 + Math.sin(t * 0.9) * 0.25;
              box.rotation.y = t * 0.4;
            },
          };
        };

        // Apps: two phones and a grid of app icons that pop in turn.
        builders["app-development"] = () => {
          const g = new THREE.Group();
          const phone = (x: number, z: number, ry: number) => {
            const p = new THREE.Group();
            p.add(rbox(1.35, 2.7, 0.18, 0.18, ink));
            p.add(at(rbox(1.2, 2.48, 0.04, 0.1, paper), 0, 0, 0.09));
            at(p, x, 0, z);
            p.rotation.y = ry;
            g.add(p);
            return p;
          };
          phone(-0.75, -0.4, 0.35);
          const front = phone(0.6, 0.2, -0.2);
          const icons: import("three").Mesh[] = [];
          for (let r = 0; r < 3; r++)
            for (let c = 0; c < 3; c++) {
              const m = at(rbox(0.28, 0.28, 0.12, 0.07, (r + c) % 3 === 0 ? orange : (r + c) % 3 === 1 ? ink : line), -0.36 + c * 0.36, 0.55 - r * 0.38, 0.16);
              front.add(m);
              icons.push(m);
            }
          return {
            group: g,
            tick: (t) => icons.forEach((m, i) => m.scale.setScalar(1 + Math.max(0, Math.sin(t * 2.4 - i * 0.55)) * 0.28)),
          };
        };

        // Custom software: a dashboard slab with live bars.
        builders["custom-software"] = () => {
          const g = new THREE.Group();
          g.add(rbox(3.4, 0.14, 2.3, 0.07, ink));
          const bars: import("three").Mesh[] = [];
          for (let i = 0; i < 6; i++) {
            const b = rbox(0.34, 1, 0.34, 0.05, i % 2 ? paper : orange);
            at(b, -1.25 + i * 0.5, 0.57, 0.35);
            g.add(b);
            bars.push(b);
          }
          [-0.55, -0.85].forEach((z, i) => g.add(at(rbox(i ? 1.6 : 2.6, 0.06, 0.12, 0.03, line), i ? -0.7 : -0.2, 0.1, z)));
          g.rotation.x = 0.42;
          return {
            group: g,
            tick: (t) =>
              bars.forEach((b, i) => {
                const h = 0.4 + (Math.sin(t * 1.3 + i * 0.9) * 0.5 + 0.5) * 1.3;
                b.scale.y = h;
                b.position.y = 0.07 + h / 2;
              }),
          };
        };

        // SEO and marketing: a magnifier gliding over rising bars.
        builders["seo-and-marketing"] = () => {
          const g = new THREE.Group();
          [0.7, 1.2, 1.9].forEach((h, i) => g.add(at(rbox(0.55, h, 0.55, 0.06, i === 2 ? orange : i === 1 ? ink : line), -0.8 + i * 0.8, -1.1 + h / 2, 0)));
          const mag = new THREE.Group();
          const ringGeo = new THREE.TorusGeometry(0.62, 0.11, 16, 56);
          const lensGeo = new THREE.CylinderGeometry(0.58, 0.58, 0.04, 48);
          const handleGeo = new THREE.CylinderGeometry(0.09, 0.11, 1.0, 24);
          geos.push(ringGeo, lensGeo, handleGeo);
          mag.add(new THREE.Mesh(ringGeo, orange));
          const lens = new THREE.Mesh(lensGeo, glass);
          lens.rotation.x = Math.PI / 2;
          mag.add(lens);
          const handle = at(new THREE.Mesh(handleGeo, ink), 0.62, -0.62, 0);
          handle.rotation.z = Math.PI / 4;
          mag.add(handle);
          at(mag, 0.2, 0.55, 0.7);
          g.add(mag);
          return {
            group: g,
            tick: (t) => {
              mag.position.x = 0.2 + Math.sin(t * 0.8) * 0.6;
              mag.position.y = 0.55 + Math.cos(t * 1.1) * 0.15;
            },
          };
        };

        const world = new THREE.Group();
        scene.add(world);
        const getModel = (slug: string) => {
          if (!models[slug] && builders[slug]) {
            const m = builders[slug]();
            m.group.visible = false;
            m.group.scale.setScalar(0.001);
            world.add(m.group);
            models[slug] = m;
          }
          return models[slug];
        };

        const pivot = { x: 0.12, y: -0.45 };
        const drag = { on: false, x: 0, y: 0, vx: 0, vy: 0 };
        const canvas = renderer.domElement;
        const down = (e: PointerEvent) => {
          drag.on = true; drag.x = e.clientX; drag.y = e.clientY;
          canvas.style.cursor = "grabbing";
          canvas.setPointerCapture(e.pointerId);
        };
        const move = (e: PointerEvent) => {
          if (!drag.on) return;
          drag.vy = (e.clientX - drag.x) * 0.01;
          drag.vx = (e.clientY - drag.y) * 0.006;
          pivot.y += drag.vy;
          pivot.x = Math.max(-0.6, Math.min(0.8, pivot.x + drag.vx));
          drag.x = e.clientX; drag.y = e.clientY;
        };
        const up = () => { drag.on = false; canvas.style.cursor = "grab"; };
        canvas.addEventListener("pointerdown", down);
        canvas.addEventListener("pointermove", move);
        canvas.addEventListener("pointerup", up);
        canvas.addEventListener("pointercancel", up);

        let current: string | null = null;
        const show = (slug: string) => {
          const next = getModel(slug);
          if (!next || slug === current) return;
          const prev = current ? models[current] : null;
          current = slug;
          if (reduce) {
            if (prev) prev.group.visible = false;
            next.group.visible = true;
            next.group.scale.setScalar(1);
            return;
          }
          if (prev) {
            gsap.killTweensOf(prev.group.scale);
            gsap.to(prev.group.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.35, ease: "power2.in", onComplete: () => { prev.group.visible = false; } });
            gsap.to(prev.group.rotation, { y: "+=1.2", duration: 0.35, ease: "power2.in" });
          }
          next.group.visible = true;
          next.group.rotation.y = -1;
          gsap.killTweensOf(next.group.scale);
          gsap.to(next.group.scale, { x: 1, y: 1, z: 1, duration: 0.7, delay: prev ? 0.2 : 0, ease: "back.out(1.6)" });
          gsap.to(next.group.rotation, { y: 0, duration: 0.9, delay: prev ? 0.2 : 0, ease: "power3.out" });
        };

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
        let visible = true;
        const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
        io.observe(el);

        const clock = new THREE.Clock();
        const tick = () => {
          if (!visible || document.hidden) return;
          const t = clock.getElapsedTime();
          // Idle: a gentle sway around the angle the visitor left it at,
          // so models stay mostly facing forward instead of turning edge-on.
          const sway = reduce ? 0 : Math.sin(t * 0.45) * 0.5;
          world.rotation.x += (pivot.x - world.rotation.x) * 0.1;
          world.rotation.y += (pivot.y + sway - world.rotation.y) * 0.08;
          if (!reduce && current) models[current].tick?.(t);
          renderer.render(scene, camera);
        };
        gsap.ticker.add(tick);

        show(activeRef.current);
        setReady(true);
        api.current = {
          show,
          dispose: () => {
            gsap.ticker.remove(tick);
            ro.disconnect(); io.disconnect();
            canvas.removeEventListener("pointerdown", down);
            canvas.removeEventListener("pointermove", move);
            canvas.removeEventListener("pointerup", up);
            canvas.removeEventListener("pointercancel", up);
            geos.forEach((g) => g.dispose());
            mats.forEach((m) => m.dispose());
            renderer.dispose();
            canvas.remove();
          },
        };
      })();
    };

    // Start only when the stage comes near the viewport.
    const lazy = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { lazy.disconnect(); start(); }
    }, { rootMargin: "300px" });
    lazy.observe(el);

    return () => {
      disposed = true;
      lazy.disconnect();
      api.current?.dispose();
      api.current = null;
    };
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] bg-ink ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 55% at 50% 45%, rgba(233,75,39,0.16), transparent 70%)" }} />
      <div ref={host} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-sm text-paper">
        <span className={`font-display text-lg font-bold tracking-tight ${showLabel ? "" : "sr-only"}`}>{label}</span>
        <span className={`text-ash transition-opacity ${ready ? "opacity-100" : "opacity-0"}`}>Drag to spin</span>
      </div>
    </div>
  );
}
