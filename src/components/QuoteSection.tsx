import React, { useState, useEffect } from 'react';

export const QuoteSection: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    '"Every expert was once a beginner. Keep dreaming, keep building."',
    '"Nothing more, just this."',
    '"Thanks for visiting."'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <section id="quote" className="relative z-10 py-20 px-[6%] text-center max-w-4xl mx-auto">
      <div className="min-h-[90px] flex items-center justify-center">
        <blockquote className="font-orbitron text-xl sm:text-2xl lg:text-3xl font-semibold text-white/90 leading-relaxed transition-opacity duration-500 max-w-2xl mx-auto">
          {quotes[quoteIndex]}
        </blockquote>
      </div>
      <cite className="block mt-4 text-[#00e5ff] font-orbitron text-xs tracking-widest uppercase not-italic">
        — Fardin.Tech Philosophy
      </cite>
    </section>
  );
};
