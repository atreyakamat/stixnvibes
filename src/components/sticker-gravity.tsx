"use client";

import { useEffect, useRef, useState } from "react";
import { stickerSrc } from "@/content/site";
import { stickerSize } from "@/content/stickers";

type Item = { id: string; w: number; h: number; x: number; y: number; r: number };

// Sticker sizes are relative to container width so the pile scales.
const ITEMS: Omit<Item, "w" | "h">[] = [
  { id: "lofi-12", x: 0.1, y: 0.52, r: -8 },
  { id: "lofi-09", x: 0.24, y: 0.6, r: 6 },
  { id: "lofi-02", x: 0.37, y: 0.58, r: -4 },
  { id: "lofi-07", x: 0.5, y: 0.66, r: 10 },
  { id: "lofi-10", x: 0.63, y: 0.55, r: -12 },
  { id: "lofi-04", x: 0.76, y: 0.62, r: 4 },
  { id: "lofi-08", x: 0.88, y: 0.57, r: -6 },
  { id: "lofi-15", x: 0.18, y: 0.82, r: 3 },
  { id: "lofi-17", x: 0.32, y: 0.85, r: -10 },
  { id: "lofi-06", x: 0.45, y: 0.86, r: 7 },
  { id: "lofi-13", x: 0.58, y: 0.84, r: -3 },
  { id: "lofi-05", x: 0.71, y: 0.86, r: 9 },
  { id: "lofi-03", x: 0.84, y: 0.84, r: -7 },
  { id: "lofi-16", x: 0.06, y: 0.84, r: 12 },
];


/**
 * Stickers that drop into a pile when the section scrolls into view, and can
 * be thrown around with the mouse. Inspired by the Gravity component on
 * fancycomponents.dev, built on matter-js. Touch devices get a tap-to-flick
 * instead of drag so the page still scrolls. Reduced motion gets a static pile.
 */
export function StickerGravity() {
  const ref = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLButtonElement | null)[]>([]);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};
    let started = false;

    const start = async () => {
      started = true;
      // Swap the static pile for the live layer before measuring.
      setLive(true);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const Matter = (await import("matter-js")).default;
      const { Engine, Runner, Bodies, Body, Composite, Mouse, MouseConstraint, Events } = Matter;

      const W = host.clientWidth;
      const H = host.clientHeight;
      const base = Math.min(Math.max(W * 0.13, 84), 170);

      const engine = Engine.create({ gravity: { x: 0, y: 1.1 } });
      const wall = { isStatic: true, render: { visible: false } };
      const t = 200;
      Composite.add(engine.world, [
        Bodies.rectangle(W / 2, H + t / 2, W * 2, t, wall),
        Bodies.rectangle(-t / 2, H / 2, t, H * 4, wall),
        Bodies.rectangle(W + t / 2, H / 2, t, H * 4, wall),
      ]);

      const bodies = ITEMS.map((item, i) => {
        const [sw, sh] = stickerSize[item.id] ?? [1, 1];
        const ratio = sw / sh;
        const w = ratio >= 1 ? base : base * ratio;
        const h = ratio >= 1 ? base / ratio : base;
        const el = els.current[i];
        if (el) {
          el.style.width = `${w}px`;
          el.style.height = `${h}px`;
          el.style.transform = "translate(-9999px, 0)";
        }
        const body = Bodies.rectangle(
          item.x * W,
          -h - Math.random() * H * 0.5 - i * 18,
          w * 0.86,
          h * 0.86,
          { chamfer: { radius: Math.min(w, h) * 0.3 }, restitution: 0.25, friction: 0.4, frictionAir: 0.012 },
        );
        Body.setAngle(body, (item.r * Math.PI) / 180);
        return body;
      });
      Composite.add(engine.world, bodies);

      if (window.matchMedia("(pointer: fine)").matches) {
        const mouse = Mouse.create(host);
        // Let the page keep scrolling over the section.
        host.removeEventListener("wheel", (mouse as unknown as { mousewheel: EventListener }).mousewheel);
        const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
        Composite.add(engine.world, mc);
      }

      const flick = (i: number) => {
        const b = bodies[i];
        Body.setVelocity(b, { x: (Math.random() - 0.5) * 14, y: -16 - Math.random() * 8 });
        Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.4);
      };
      const onTap = (e: Event) => {
        const i = Number((e.currentTarget as HTMLElement).dataset.i);
        if (!window.matchMedia("(pointer: fine)").matches) flick(i);
      };
      els.current.forEach((el) => el?.addEventListener("click", onTap));

      Events.on(engine, "afterUpdate", () => {
        bodies.forEach((b, i) => {
          const el = els.current[i];
          if (!el) return;
          el.style.transform = `translate(${b.position.x - el.offsetWidth / 2}px, ${
            b.position.y - el.offsetHeight / 2
          }px) rotate(${b.angle}rad)`;
        });
      });

      const runner = Runner.create();
      Runner.run(runner, engine);

      // Pause the simulation when it is off screen or the tab is hidden.
      const io = new IntersectionObserver(([entry]) => {
        runner.enabled = entry.isIntersecting && !document.hidden;
      });
      io.observe(host);
      const onVis = () => (runner.enabled = !document.hidden);
      document.addEventListener("visibilitychange", onVis);

      cleanup = () => {
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        els.current.forEach((el) => el?.removeEventListener("click", onTap));
        Runner.stop(runner);
        Engine.clear(engine);
      };
    };

    const trigger = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          trigger.disconnect();
          start();
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    trigger.observe(host);

    return () => {
      trigger.disconnect();
      cleanup();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative h-[26rem] select-none overflow-hidden sm:h-[30rem] md:h-[34rem] ${
        live ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {ITEMS.map((item, i) => (
        <button
          key={item.id}
          ref={(el) => {
            els.current[i] = el;
          }}
          type="button"
          tabIndex={-1}
          data-i={i}
          className={`absolute left-0 top-0 will-change-transform ${live ? "" : "static-pile"}`}
          style={
            live
              ? undefined
              : {
                  left: `${item.x * 100}%`,
                  top: `${item.y * 100}%`,
                  transform: `translate(-50%, -50%) rotate(${item.r}deg)`,
                  width: "clamp(84px, 13%, 170px)",
                }
          }
        >
          <img
            src={stickerSrc(item.id)}
            alt=""
            draggable={false}
            loading="lazy"
            className="sticker-shadow pointer-events-none size-full object-contain"
          />
        </button>
      ))}
    </div>
  );
}
