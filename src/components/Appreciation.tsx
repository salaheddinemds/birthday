import { useEffect, useRef, useState } from 'react';
import { Heart, Star, Sparkles, Sun, Smile, Gift } from 'lucide-react';

const MESSAGES = [
  {
    icon: Heart,
    title: 'A True Friend',
    message: 'Thank you for being such an amazing friend, Maissa. You have always been there with open arms, a warm heart, and the most genuine smile.',
    color: '#f43f5e',
  },
  {
    icon: Sun,
    title: 'You Brighten Every Day',
    message: 'Your kindness and positivity make every single day brighter. The world is a better place simply because you are in it.',
    color: '#f59e0b',
  },
  {
    icon: Star,
    title: 'You Are a Star',
    message: 'I wish you all the happiness, success, and beautiful memories your heart can hold. You deserve every good thing life has to offer.',
    color: '#fbbf24',
  },
  {
    icon: Smile,
    title: 'Your Laughter Is Magic',
    message: 'Your laugh is one of the most beautiful sounds in my world. Never stop laughing, never stop smiling — it lights up every room.',
    color: '#ec4899',
  },
  {
    icon: Sparkles,
    title: 'Snail Lover Extraordinaire',
    message: 'You and your love for snails! It\'s adorable and uniquely you. Just like escargots, you move through life with grace and style. 🐌',
    color: '#f43f5e',
  },
  {
    icon: Gift,
    title: 'A Gift to Life',
    message: 'On your special day, remember how strong you are. Every step forward is a victory, and I hope this year brings you more confidence and happiness. ✨',
    color: '#fb7185',
  },
];

export default function Appreciation() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="appreciation" ref={sectionRef} className="py-20 px-4 md:px-8" style={{ background: 'linear-gradient(180deg, #fff7ed, #fff0f5)' }}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm uppercase tracking-widest text-rose-400 font-semibold mb-2">From the Heart</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800">
            Words of <span className="text-gradient-pink">Appreciation</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MESSAGES.map(({ icon: Icon, title, message, color }, i) => (
            <div
              key={i}
              className={`glass-dark rounded-3xl p-7 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md"
                style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)`, border: `2px solid ${color}33` }}
              >
                <Icon size={24} style={{ color }} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 mb-3">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
              <div className="mt-5 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
