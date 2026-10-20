"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function canPlay() {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return !window.matchMedia(QUERY).matches && !saveData;
}

// The poster is the LCP image and carries the scene on its own. The video is
// an enhancement: skipped for reduced motion and data saver, faded in only
// once it is actually playing.
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const allowed = useSyncExternalStore(subscribe, canPlay, () => false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const enabled = allowed && !failed;

  useEffect(() => {
    const video = ref.current;
    if (!enabled || !video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    const onVisibility = () => (document.hidden ? video.pause() : undefined);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  return (
    <>
      <img
        src="/media/hero-poster.webp"
        srcSet="/media/hero-poster-768.webp 768w, /media/hero-poster.webp 1280w"
        sizes="(min-width: 1024px) 60vw, 100vw"
        width={1280}
        height={720}
        alt="A desk at night covered in Stix N Vibes stickers, with the Stix N Vibes name glowing on the rainy window"
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      {enabled && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/media/hero.webm" type="video/webm" />
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}
