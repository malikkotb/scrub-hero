'use client';
import { useEffect } from 'react'
import Lenis from 'lenis'
import ScrubHero from '@/components/ScrubHero';

export default function Home() {

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main>
      <ScrubHero />
    </main>
  );
}
