import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const CursorGlowAndScroll: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
      setShowBackToTop(winScroll > 400);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#00e5ff] via-[#0084ff] to-[#0090FF] z-[100] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Mouse Glow Halo (desktop only) */}
      <div
        className="hidden md:block pointer-events-none fixed z-0 w-80 h-80 rounded-full transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background:
            'radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(189,0,255,0.03) 50%, transparent 80%)'
        }}
      />

      {/* Back to Top Floating Button */}
      <button
        id="back-to-top-btn"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-11 h-11 rounded-full border border-[#00e5ff] bg-[#06060c]/80 backdrop-blur-md text-[#00e5ff] flex items-center justify-center z-40 transition-all duration-300 hover:bg-[#00e5ff] hover:text-[#06060c] hover:shadow-[0_0_15px_#00e5ff] hover:-translate-y-1 ${
          showBackToTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll back to top"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
};
