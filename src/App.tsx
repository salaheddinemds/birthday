import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Appreciation from './components/Appreciation';
import TypingWishes from './components/TypingWishes';
import FinalMessage from './components/FinalMessage';
import Footer from './components/Footer';
import Confetti from './components/Confetti';
import Balloons from './components/Balloons';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [confettiActive, setConfettiActive] = useState(false);

  const handleLoadingDone = () => {
    setLoading(false);
    setTimeout(() => {
      setConfettiActive(true);
      setTimeout(() => setConfettiActive(false), 100);
    }, 400);
  };

  const triggerConfetti = () => {
    setConfettiActive(false);
    setTimeout(() => setConfettiActive(true), 50);
    setTimeout(() => setConfettiActive(false), 150);
  };

  useEffect(() => {
    document.title = 'Happy Birthday 🎉';
  }, []);

  return (
    <>
      {loading && <LoadingScreen onDone={handleLoadingDone} />}

      <div
        className={`transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <Confetti active={confettiActive} />
        <Balloons />
        <Navbar />

        <main>
          <Hero onTriggerConfetti={triggerConfetti} />
          <Gallery />
          <Appreciation />
          <TypingWishes />
          <FinalMessage />
        </main>

        <Footer />
      </div>
    </>
  );
}
