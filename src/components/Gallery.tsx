import { useEffect, useRef, useState } from 'react';

const PHOTOS = [
  '/Snapchat-60135165.jpg',
  '/Snapchat-71774408.jpg',
  '/Snapchat-187751905.jpg',
  '/Snapchat-199078897.jpg',
  '/Snapchat-210773261.jpg',
  '/Snapchat-342347019.jpg',
  '/Snapchat-372406976.jpg',
  '/Snapchat-504667896.jpg',
  '/Snapchat-654654233.jpg',
  '/Snapchat-1064387861.jpg',
  '/Snapchat-1343950114.jpg',
  '/Snapchat-1453241773.jpg',
  '/Snapchat-1699788034.jpg',
  '/Snapchat-1805506309.jpg',
  '/Snapchat-2095943229.jpg',
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-20 px-4 md:px-8" style={{ background: 'linear-gradient(180deg, #fff0f5, #fdf2f8)' }}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm uppercase tracking-widest text-rose-400 font-semibold mb-2">Captured Moments</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800">
            <span className="text-gradient-pink">Photo Gallery</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">Every picture tells a story of laughter, love, and unforgettable moments.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms`, aspectRatio: i % 3 === 1 ? '3/4' : '4/5' }}
              onClick={() => setLightbox(src)}
            >
              <img
                src={src}
                alt={`Memory ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium">View Photo</span>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-rose-300/50 rounded-2xl transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="relative max-w-3xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt="Photo" className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
            <button
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 shadow-lg hover:scale-110 transition-transform"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
