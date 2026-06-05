import { useEffect, useState } from 'react';

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onDone, 600);
          }, 300);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-600"
      style={{
        background: 'linear-gradient(135deg, #1a0a0f 0%, #2d1018 40%, #1a0a0f 100%)',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      {/* Animated background orbs */}
      <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-float" style={{ background: 'radial-gradient(circle, #f43f5e, transparent)', top: '10%', left: '20%' }} />
      <div className="absolute w-64 h-64 rounded-full blur-3xl opacity-15 animate-float" style={{ background: 'radial-gradient(circle, #fbbf24, transparent)', bottom: '20%', right: '15%', animationDelay: '1s' }} />

      <div className="relative z-10 text-center px-8">
        {/* Cake icon */}
        <div className="text-7xl mb-6 animate-float">🎂</div>

        <h1
          className="font-playfair text-4xl md:text-5xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, #f43f5e, #fbbf24, #f43f5e)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 2s linear infinite',
          }}
        >
          Happy Birthday
        </h1>

        <p className="text-gray-400 text-lg mb-10 font-light tracking-wide">
          Something special is loading...
        </p>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: 'linear-gradient(90deg, #f43f5e, #fbbf24)',
              }}
            />
          </div>
          <p className="text-gray-500 text-xs mt-3">{Math.min(Math.round(progress), 100)}%</p>
        </div>

        {/* Floating elements */}
        <div className="flex justify-center gap-6 mt-10 text-2xl">
          {['✨', '🌹', '💖', '🌟', '🎉'].map((char, i) => (
            <span
              key={i}
              className="animate-float opacity-60"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
