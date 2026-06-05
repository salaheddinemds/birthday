import { useEffect, useState } from 'react';

interface Balloon {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
}

const BALLOON_COLORS = [
  ['#f43f5e', '#fb7185'],
  ['#fbbf24', '#fcd34d'],
  ['#ec4899', '#f9a8d4'],
  ['#f97316', '#fdba74'],
  ['#ef4444', '#fca5a5'],
];

export default function Balloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const b = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 5 + i * 12,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length][0],
      size: 50 + Math.random() * 30,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setBalloons(b);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-10 overflow-hidden" style={{ height: '100vh' }}>
      {balloons.map((b) => (
        <div
          key={b.id}
          style={{
            position: 'absolute',
            bottom: '0',
            left: `${b.x}%`,
            animation: `balloon-float ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
        >
          <svg width={b.size} height={b.size * 1.3} viewBox="0 0 60 78" fill="none">
            <ellipse cx="30" cy="28" rx="26" ry="28" fill={b.color} opacity="0.85" />
            <ellipse cx="22" cy="18" rx="7" ry="5" fill="white" opacity="0.3" />
            <path d="M30 56 Q28 62 30 68 Q32 74 30 78" stroke={b.color} strokeWidth="1.5" fill="none" opacity="0.7" />
            <path d="M26 56 Q24 60 26 64 Q28 66 24 68" stroke={b.color} strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
      ))}
    </div>
  );
}
