import { useEffect, useRef, useState } from 'react';

export default function FinalMessage() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="final"
      ref={ref}
      className="py-24 px-4 md:px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fff0f5, #fdf2f8, #fff7ed)' }}
    >
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #f43f5e, transparent)' }} />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }} />

      <div
        className={`max-w-3xl mx-auto text-center relative z-10 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
        }`}
      >
        <div className="glass-card rounded-[2rem] p-10 md:p-16 animate-pulse-glow">
          <div className="flex justify-center mb-6 gap-2 text-3xl">
            <span className="animate-float" style={{ animationDelay: '0s' }}>✨</span>
            <span className="animate-float" style={{ animationDelay: '0.5s' }}>💖</span>
            <span className="animate-float" style={{ animationDelay: '1s' }}>✨</span>
          </div>

          <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-relaxed mb-4">
            💌 Secret Message
          </h3>

          <div className="w-20 h-1 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #f43f5e, #fbbf24)' }} />

          <div className="flex justify-center">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              className="px-6 py-2 bg-rose-500 text-white rounded-full shadow hover:bg-rose-600 transition focus:outline-none"
            >
              {open ? 'Close' : 'Open a Secret Message'}
            </button>
          </div>

          <div
            aria-hidden={!open}
            className={`mt-6 text-gray-600 text-base md:text-lg leading-relaxed space-y-4 overflow-hidden transition-all duration-700 ease-out ${
              open ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
            }`}
          >
            <p>
              Today is all about celebrating the amazing person you are. Your kindness, strength, intelligence, and beautiful heart make you truly special. You have a way of bringing warmth and positivity wherever you go, and your determination inspires those around you.
            </p>
            <p>
              May this new year of your life be filled with happiness, success, confidence, and all the beautiful things you deserve. Never stop believing in yourself, because you are capable of achieving great things.
            </p>
            <p>
              Wishing you a wonderful birthday and a year full of joy, laughter, and unforgettable moments. ✨🎉
            </p>
            <p>
              If you ever think of me, I hope you remember me as someone who brought a little light and positivity into your life.
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-3 text-2xl">
            {['❤️', '🌹', '✨', '🎂', '🥂'].map((char, i) => (
              <span
                key={i}
                className="animate-float"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
