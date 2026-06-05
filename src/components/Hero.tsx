import { useEffect, useState } from 'react';
import Countdown from './Countdown';

interface FloatingEl {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  symbol: string;
}

const SYMBOLS = ['💖', '✨', '🌟', '💫', '🌸', '❤️', '🌹', '⭐'];

export default function Hero({ onTriggerConfetti }: { onTriggerConfetti: () => void }) {
  const [floaters, setFloaters] = useState<FloatingEl[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const els = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 6,
      size: 18 + Math.random() * 20,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    }));
    setFloaters(els);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-hero"
    >
      {/* Floating background symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floaters.map((f) => (
          <div
            key={f.id}
            className="absolute select-none"
            style={{
              left: `${f.x}%`,
              top: `${20 + Math.random() * 60}%`,
              fontSize: `${f.size}px`,
              animation: `float ${f.duration}s ease-in-out ${f.delay}s infinite`,
              opacity: 0.3,
            }}
          >
            {f.symbol}
          </div>
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, #f43f5e33, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(circle, #fbbf2433, transparent)' }} />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-md"
          style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(244,63,94,0.2)', color: '#f43f5e' }}
        >
          <span className="animate-pulse text-base">🎂</span>
          <span>A special celebration</span>
        </div>

        {/* Main title */}
        <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold mb-4 leading-none">
          <span className="text-gradient-pink shimmer-text">Happy</span>
          <br />
          <span
            className="font-playfair italic"
            style={{ color: '#1a0a0f' }}
          >
            Birthday, Maissa
          </span>
          <span className="ml-3 animate-sparkle inline-block">🎉</span>
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="flex-1 max-w-20 h-px" style={{ background: 'linear-gradient(90deg, transparent, #f43f5e)' }} />
          <span className="text-rose-300 text-lg">✦</span>
          <div className="flex-1 max-w-20 h-px" style={{ background: 'linear-gradient(90deg, #f43f5e, transparent)' }} />
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 font-light tracking-wide mb-4 max-w-lg mx-auto leading-relaxed">
          A special day for a{' '}
          <span className="font-semibold text-rose-500">special person</span>
        </p>
        <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed">
          This page was made with love, just for you. Take a moment to feel how much you are cherished.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <button
            onClick={() => {
              onTriggerConfetti();
              document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-2xl text-white font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #f43f5e, #fbbf24)' }}
          >
            See Your Memories ✨
          </button>
          <button
            onClick={() => document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-2xl font-semibold text-base hover:-translate-y-1 transition-all duration-300 glass-card"
            style={{ color: '#f43f5e', border: '1px solid rgba(244,63,94,0.3)' }}
          >
            Birthday Wishes 💌
          </button>
        </div>

        {/* Countdown */}
        <div className="max-w-sm mx-auto">
          <Countdown />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-70'}`}
      >
        <span className="text-gray-400 text-xs tracking-widest uppercase">Scroll down</span>
        <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex items-start justify-center pt-1">
          <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
