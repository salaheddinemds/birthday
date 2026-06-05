import { useEffect, useState } from 'react';

const WISHES = [
  'Happiness',
  'Success',
  'Good Health',
  'Endless Smiles',
  'Love & Joy',
  'Beautiful Adventures',
  'Peace of Mind',
  'Dreams Come True',
];

export default function TypingWishes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WISHES[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 100);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 60);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % WISHES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, currentIndex]);

  return (
    <div className="text-center py-20 px-4" id="wishes">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-rose-400 font-semibold mb-4">Birthday Wishes</p>
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          I wish you...
        </h2>
        <div
          className="inline-block text-4xl md:text-6xl font-bold shimmer-text font-playfair min-h-[1.3em]"
          style={{ borderRight: '3px solid #f43f5e', paddingRight: '4px' }}
        >
          {displayed}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {WISHES.map((w, i) => (
            <span
              key={w}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                i === currentIndex
                  ? 'text-white shadow-lg scale-105'
                  : 'glass-dark text-rose-400'
              }`}
              style={
                i === currentIndex
                  ? { background: 'linear-gradient(135deg, #f43f5e, #fbbf24)' }
                  : {}
              }
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
