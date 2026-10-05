import { useState, useEffect, useRef } from 'react';

export function useHeroRotation(itemCount: number, intervalMs = 6000) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (itemCount <= 1 || isPaused) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % itemCount);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [itemCount, isPaused, intervalMs]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return {
    activeIndex,
    setActiveIndex,
    handleMouseEnter,
    handleMouseLeave,
  };
}
