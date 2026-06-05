import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Gallery', id: 'gallery' },
  { label: 'Messages', id: 'appreciation' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'py-3 shadow-md' : 'py-5'
      }`}
      style={{
        background: scrolled ? 'rgba(255,240,245,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(244,63,94,0.15)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <span className="font-playfair text-xl font-bold text-gradient-pink">Maissa's Birthday 🎂</span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors duration-200"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('final')}
            className="px-5 py-2 rounded-full text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #f43f5e, #fbbf24)' }}
          >
            Final Message 💌
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-rose-400 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`w-6 h-0.5 bg-rose-400 mb-1 transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-6 h-0.5 bg-rose-400 mb-1 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-rose-400 transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 pt-2" style={{ background: 'rgba(255,240,245,0.95)', backdropFilter: 'blur(20px)' }}>
          {[...NAV_LINKS, { label: 'Final Message 💌', id: 'final' }].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="block w-full text-left py-3 text-sm font-medium text-gray-700 border-b border-rose-100 last:border-0 hover:text-rose-500 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
