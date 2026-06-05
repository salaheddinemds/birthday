import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="py-12 px-4 text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0a0f, #2d1018)' }}
    >
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: '#fbbf24',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random(),
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-8 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #f43f5e)' }} />
          <Heart size={18} className="text-rose-400 fill-rose-400 animate-pulse" />
          <div className="w-8 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #f43f5e, transparent)' }} />
        </div>

        <p className="text-gray-300 text-sm mb-1 font-medium">
          Made with{' '}
          <span className="text-rose-400">❤️</span>{' '}
          especially for your birthday
        </p>

        <p className="text-gray-500 text-xs mt-3">
          June 7th — A day as special as you are ✨
        </p>

        <div className="mt-6 flex justify-center gap-3 text-xl">
          {['🌹', '✨', '💫', '🎂', '💖'].map((char, i) => (
            <span
              key={i}
              className="animate-float opacity-70"
              style={{ animationDelay: `${i * 0.4}s`, fontSize: '16px' }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
