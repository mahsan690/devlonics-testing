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

        // Small shapes shared by the models below.
        const pinMesh = (scale = 1) => {
          const p = new THREE.Group();
          const head = new THREE.SphereGeometry(0.5 * scale, 40, 40);
          const tip = new THREE.ConeGeometry(0.43 * scale, 0.95 * scale, 40);
          const hole = new THREE.CylinderGeometry(0.19 * scale, 0.19 * scale, 0.08, 32);
          geos.push(head, tip, hole);
          p.add(new THREE.Mesh(head, orange));
          const cone = at(new THREE.Mesh(tip, orange), 0, -0.6 * scale, 0);
          cone.rotation.x = Math.PI;
          p.add(cone);
          const dot = at(new THREE.Mesh(hole, paper), 0, 0, 0.47 * scale);
          dot.rotation.x = Math.PI / 2;
          p.add(dot);
          return p;
        };
        const starGeo = (() => {
          const shape = new THREE.Shape();
          for (let i = 0; i < 10; i++) {
            const r = i % 2 ? 0.14 : 0.32;
            const a = Math.PI / 2 + (i * Math.PI) / 5;
            if (i === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
            else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          }
          shape.closePath();
          const g = new THREE.ExtrudeGeometry(shape, { depth: 0.12, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025, bevelSegments: 2 });
          g.center();
          geos.push(g);
          return g;
        })();

        // Website design and redesign: a browser window whose layers float apart.
        builders["website-design"] = () => {
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

        // Reputation management: five stars light up over a review card.
        builders["reputation-management"] = () => {
          const g = new THREE.Group();
          const card = at(new THREE.Group(), 0, -0.6, 0);
          card.add(rbox(3.2, 1.45, 0.14, 0.14, paper));
          const avatarGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.06, 32);
          geos.push(avatarGeo);
          const avatar = at(new THREE.Mesh(avatarGeo, ink), -1.15, 0.25, 0.1);
          avatar.rotation.x = Math.PI / 2;
          card.add(avatar);
          card.add(at(rbox(1.5, 0.12, 0.04, 0.03, ink), -0.1, 0.32, 0.09));
          card.add(at(rbox(2.5, 0.09, 0.04, 0.03, line), 0, -0.12, 0.09));
          card.add(at(rbox(1.9, 0.09, 0.04, 0.03, line), -0.3, -0.36, 0.09));
          g.add(card);
          const stars = [-1.2, -0.6, 0, 0.6, 1.2].map((x) => {
            const s = at(new THREE.Mesh(starGeo, orange), x, 0.75, 0.15);
            g.add(s);
            return s;
          });
          return {
            group: g,
            tick: (t) =>
              stars.forEach((s, i) => {
                const p = Math.max(0, Math.sin(t * 2.2 - i * 0.55));
                s.scale.setScalar(1 + p * 0.32);
                s.position.y = 0.75 + p * 0.12;
                s.rotation.y = Math.sin(t * 1.4 + i) * 0.35;
              }),
          };
        };

        // Google Business Profile: a map pin bouncing over a profile card.
        builders["google-business-profile"] = () => {
          const g = new THREE.Group();
          const card = at(new THREE.Group(), -0.35, -0.5, 0);
          card.add(rbox(2.7, 1.9, 0.14, 0.14, paper));
          card.add(at(rbox(2.7, 0.5, 0.16, 0.12, ink), 0, 0.7, 0.01));
          card.add(at(rbox(1.6, 0.12, 0.04, 0.03, ink), -0.45, 0.12, 0.09));
          [-0.62, -0.31, 0, 0.31, 0.62].forEach((x) => {
            const s = at(new THREE.Mesh(starGeo, orange), x - 0.45, -0.22, 0.12);
            s.scale.setScalar(0.38);
            card.add(s);
          });
          card.add(at(rbox(0.9, 0.3, 0.06, 0.08, orange), -0.75, -0.62, 0.1));
          card.add(at(rbox(0.9, 0.3, 0.06, 0.08, line), 0.3, -0.62, 0.1));
          g.add(card);
          const pin = at(pinMesh(1), 0.95, 0.85, 0.6);
          g.add(pin);
          const ringGeo = new THREE.TorusGeometry(0.35, 0.03, 8, 40);
          geos.push(ringGeo);
          const ring = at(new THREE.Mesh(ringGeo, line), 0.95, -0.15, 0.6);
          ring.rotation.x = Math.PI / 2;
          g.add(ring);
          return {
            group: g,
            tick: (t) => {
              const b = Math.abs(Math.sin(t * 2.1));
              pin.position.y = 0.75 + b * 0.35;
              ring.scale.setScalar(1.15 - b * 0.35);
            },
          };
        };

        // Lead generation and lead flow: a quote form whose leads travel to
        // three destinations (inbox, sheet, CRM).
        builders["lead-generation"] = () => {
          const g = new THREE.Group();
          const form = at(new THREE.Group(), -1.35, 0, 0);
          form.add(rbox(1.35, 2.1, 0.14, 0.14, paper));
          [0.6, 0.25, -0.1].forEach((y) => form.add(at(rbox(1.0, 0.18, 0.04, 0.04, line), 0, y, 0.09)));
          form.add(at(rbox(1.0, 0.28, 0.06, 0.08, orange), 0, -0.6, 0.1));
          g.add(form);
          const ys = [0.85, 0, -0.85];
          ys.forEach((y, i) => {
            const tile = at(new THREE.Group(), 1.35, y, 0);
            tile.add(rbox(1.0, 0.62, 0.14, 0.1, i === 2 ? orange : i === 1 ? paper : ink));
            tile.add(at(rbox(0.6, 0.08, 0.04, 0.03, i === 0 ? line : ink), 0, 0.08, 0.09));
            tile.add(at(rbox(0.4, 0.08, 0.04, 0.03, i === 0 ? line : ink), -0.1, -0.1, 0.09));
            g.add(tile);
          });
          const curves = ys.map((y) => new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.68, -0.6, 0.12),
            new THREE.Vector3(0, (y - 0.6) / 2, 0.3),
            new THREE.Vector3(0.82, y, 0.12),
          ]));
          curves.forEach((c) => {
            const tube = new THREE.TubeGeometry(c, 40, 0.02, 8, false);
            geos.push(tube);
            g.add(new THREE.Mesh(tube, line));
          });
          const dotGeo = new THREE.SphereGeometry(0.08, 20, 20);
          geos.push(dotGeo);
          const dots = curves.map(() => {
            const d = new THREE.Mesh(dotGeo, orange);
            g.add(d);
            return d;
          });
          return {
            group: g,
            tick: (t) => dots.forEach((d, i) => d.position.copy(curves[i].getPoint((t * 0.55 + i * 0.12) % 1))),
          };
        };

        // Local ads: a service-area map with a pin, radius rings and homes
        // that pop up as the rings reach them.
        builders["local-ads"] = () => {
          const g = new THREE.Group();
          const area = new THREE.Group();
          const discGeo = new THREE.CylinderGeometry(2.1, 2.1, 0.12, 72);
          geos.push(discGeo);
          area.add(new THREE.Mesh(discGeo, paper));
          const roofGeo = new THREE.ConeGeometry(0.2, 0.18, 4);
          geos.push(roofGeo);
          const homes = [[1.2, 0.5], [-1.1, 0.8], [0.4, -1.3], [-0.6, -1.0], [1.3, -0.7], [-1.5, -0.2], [0.2, 1.4]].map(([x, z], i) => {
            const h = at(new THREE.Group(), x, 0.06, z);
            h.add(at(rbox(0.26, 0.22, 0.26, 0.03, i % 3 === 0 ? ink : line), 0, 0.11, 0));
            const roof = at(new THREE.Mesh(roofGeo, i % 3 === 0 ? orange : ink), 0, 0.31, 0);
            roof.rotation.y = Math.PI / 4;
            h.add(roof);
            area.add(h);
            return { h, r: Math.hypot(x, z) };
          });
          const ringGeo = new THREE.TorusGeometry(1, 0.025, 8, 72);
          geos.push(ringGeo);
          const rings = [0, 1].map(() => {
            const m = orange.clone();
            m.transparent = true;
            mats.push(m);
            const r = at(new THREE.Mesh(ringGeo, m), 0, 0.08, 0);
            r.rotation.x = Math.PI / 2;
            area.add(r);
            return r;
          });
          area.add(at(pinMesh(0.55), 0, 0.72, 0));
          area.rotation.x = 0.55;
          at(area, 0, -0.35, 0);
          g.add(area);
          return {
            group: g,
            tick: (t) => {
              rings.forEach((r, i) => {
                const p = (t * 0.35 + i / 2) % 1;
                r.scale.setScalar(0.25 + p * 1.75);
                (r.material as import("three").MeshStandardMaterial).opacity = 1 - p;
              });
              const front = ((t * 0.35) % 1) * 2;
              homes.forEach(({ h, r }) => h.scale.setScalar(1 + Math.max(0, 0.35 - Math.abs(front - r)) * 1.2));
            },
          };
        };

        // Automation: a chat bubble whose dots type, over a live voice waveform.
        builders["automation"] = () => {
          const g = new THREE.Group();
          const bubble = new THREE.Group();
          bubble.add(rbox(2.7, 1.6, 0.34, 0.34, ink));
          const tail = rbox(0.5, 0.5, 0.3, 0.06, ink);
          tail.rotation.z = Math.PI / 4;
          bubble.add(at(tail, -0.8, -0.72, 0));
          const dotGeo = new THREE.SphereGeometry(0.16, 24, 24);
          geos.push(dotGeo);
          const dots = [-0.55, 0, 0.55].map((x) => {
            const d = at(new THREE.Mesh(dotGeo, orange), x, 0, 0.22);
            bubble.add(d);
            return d;
          });
          at(bubble, -0.25, 0.55, 0);
          g.add(bubble);
          const bars = Array.from({ length: 9 }, (_, i) => {
            const b = rbox(0.18, 1, 0.18, 0.06, i % 3 === 1 ? orange : paper);
            at(b, -0.2 + (i - 4) * 0.3, -1.05, 0.25);
            g.add(b);
            return b;
          });
          return {
            group: g,
            tick: (t) => {
              dots.forEach((d, i) => (d.position.y = Math.max(0, Math.sin(t * 4 - i * 0.7)) * 0.18));
              bars.forEach((b, i) => {
                const h = 0.25 + Math.abs(Math.sin(t * 3 + i * 0.8)) * 0.75 * (1 - Math.abs(i - 4) / 6);
                b.scale.y = h;
              });
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
