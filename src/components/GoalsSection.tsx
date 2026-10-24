import React from 'react';

export const GoalsSection: React.FC = () => {
  const goals = [
    {
      type: 'odd',
      title: 'Academic Goal',
      titleColor: 'text-[#00e5ff]',
      dotBorder: 'border-[#00e5ff] shadow-[0_0_8px_#00e5ff]',
      description:
        'To build a strong academic foundation in science, mathematics, and computer systems while developing deep problem-solving and analytical thinking skills for advanced technological studies.'
    },
    {
      type: 'even',
      title: 'Career Goal',
      titleColor: 'text-[#0090FF]',
      dotBorder: 'border-[#0090FF] shadow-[0_0_8px_#0090FF]',
      description:
        'To establish a software-based business focused on building scalable digital products, innovative applications, and intelligent systems that create real-world impact and long-term value.'
    },
    {
      type: 'odd',
      title: 'Personal Development Goal',
      titleColor: 'text-[#00e5ff]',
      dotBorder: 'border-[#00e5ff] shadow-[0_0_8px_#00e5ff]',
      description:
        'To continuously improve discipline, creativity, and technical skills while evolving into a focused, self-driven individual capable of adapting to future technologies and challenges.'
    }
  ];

  return (
    <section id="goals" className="relative z-10 py-16 px-[6%] max-w-[1400px] mx-auto">
      <h2 className="section-title">My Goals</h2>

      <div className="relative max-w-3xl mx-auto py-4">
        {/* Center vertical line */}
        <div className="absolute top-0 bottom-0 left-5 md:left-1/2 w-[2px] bg-gradient-to-b from-[#00e5ff] via-[#0090FF] to-[#bd00ff] -translate-x-1/2" />

        <div className="space-y-12">
          {goals.map((goal, index) => {
            const isOdd = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start ${
                  isOdd ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute top-6 left-5 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#06060c] border-[3px] z-10 ${goal.dotBorder}`}
                />

                {/* Card Container */}
                <div
                  className={`w-full pl-12 md:pl-0 md:w-[46%] ${
                    isOdd ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                  }`}
                >
                  <div className="glass-panel p-5 hover:border-white/20 transition-all">
                    <h3 className={`font-orbitron text-base font-bold mb-2 ${goal.titleColor}`}>
                      {goal.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A0A0C0] leading-relaxed font-poppins">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
