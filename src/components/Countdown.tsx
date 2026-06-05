import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 5, 7); // June 7
  if (now >= target) {
    target = new Date(year + 1, 5, 7);
  }
  const diff = target.getTime() - now.getTime();
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const now = new Date();
    if (now.getMonth() === 5 && now.getDate() === 7) {
      setIsBirthday(true);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isBirthday) {
    return (
      <div className="glass-card rounded-3xl p-6 text-center">
        <p className="text-2xl font-bold text-gradient-pink font-playfair">Today is the Day!</p>
        <p className="text-rose-400 mt-1">Happy Birthday! 🎉</p>
      </div>
    );
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="glass-card rounded-3xl p-6">
      <p className="text-center text-rose-500 font-semibold text-sm uppercase tracking-widest mb-4">
        Countdown to June 7th
      </p>
      <div className="flex justify-center gap-3 flex-wrap">
        {units.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #fbbf24)' }}
            >
              {String(value).padStart(2, '0')}
            </div>
            <span className="text-xs text-rose-400 mt-1 font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
