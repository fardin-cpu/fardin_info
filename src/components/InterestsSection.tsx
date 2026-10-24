import React from 'react';

export const InterestsSection: React.FC = () => {
  const interests = [
    {
      id: 'science',
      title: 'Science',
      icon: 'fa-solid fa-atom',
      color: 'neon-text-cyan',
      description:
        'Exploring the fundamental principles of physics, cosmic structures, and the logical frameworks that govern natural systems.'
    },
    {
      id: 'ai-tech',
      title: 'AI & Technology',
      icon: 'fa-solid fa-brain',
      color: 'neon-text-purple',
      description:
        'Diving into intelligent systems, machine learning concepts, algorithmic thinking, and the evolving layers of modern digital technology.'
    },
    {
      id: 'electronics',
      title: 'Electronics',
      icon: 'fa-solid fa-microchip',
      color: 'neon-text-cyan',
      description:
        'Designing and understanding circuit systems, embedded components, and hardware architectures that power smart devices.'
    },
    {
      id: 'robotics',
      title: 'Robotics',
      icon: 'fa-solid fa-robot',
      color: 'neon-text-purple',
      description:
        'Building and studying autonomous systems by integrating sensors, microcontrollers, and mechanical movement for real-world automation.'
    }
  ];

  return (
    <section id="interests" className="relative z-10 py-16 px-[6%] max-w-[1400px] mx-auto">
      <h2 className="section-title">Interests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {interests.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-6 sm:p-7 hover:-translate-y-1.5 transition-all duration-300 hover:border-[#00e5ff] hover:shadow-[0_8px_25px_rgba(0,229,255,0.1)] group"
          >
            <div className="flex items-center gap-3.5 mb-3.5">
              <i className={`${item.icon} ${item.color} text-2xl group-hover:scale-110 transition-transform`}></i>
              <h3 className="font-orbitron text-lg font-semibold text-white group-hover:text-[#00e5ff] transition-colors">
                {item.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#A0A0C0] leading-relaxed font-poppins">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
