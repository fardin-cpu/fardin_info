import React from 'react';

export const HobbiesSection: React.FC = () => {
  const hobbies = [
    {
      id: 'gaming',
      title: 'Gaming',
      icon: 'fa-solid fa-gamepad',
      iconColor: 'text-[#00e5ff]',
      borderColor: 'border-[#00e5ff]/30',
      description:
        'Exploring competitive gameplay systems, open-world mechanics, and game engine behavior to understand how interactive digital environments are built and optimized.'
    },
    {
      id: 'electronics-cad',
      title: 'Electronics and CAD',
      icon: 'fa-solid fa-microchip',
      iconColor: 'text-[#bd00ff]',
      borderColor: 'border-[#bd00ff]/30',
      description:
        'Working with basic circuit systems, microcontrollers like ESP32, and creating simple 3D models using CAD tools to understand real-world hardware and design fundamentals.'
    },
    {
      id: 'vibe-coding',
      title: 'AI Assisted Vibe Coding',
      icon: 'fa-solid fa-laptop-code',
      iconColor: 'text-[#00ff88]',
      borderColor: 'border-[#00ff88]/30',
      description:
        'Using AI tools and LLMs to support coding workflows, improve logic building, and develop projects faster while focusing on practical software development.'
    },
    {
      id: 'sandbox',
      title: 'Sandbox Experimentation',
      icon: 'fa-solid fa-cubes',
      iconColor: 'text-[#ff3366]',
      borderColor: 'border-[#ff3366]/30',
      description:
        'Experimenting with small tech ideas, coding projects, and system concepts to learn through trial, error, and iterative improvement.'
    }
  ];

  return (
    <section id="hobbies" className="relative z-10 py-16 px-[6%] max-w-[1400px] mx-auto">
      <h2 className="section-title">Hobbies & Passions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hobbies.map((hobby) => (
          <div
            key={hobby.id}
            className="glass-panel p-6 text-center hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden"
          >
            {/* Gloss shine line */}
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:left-[150%] transition-all duration-700 pointer-events-none" />

            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl bg-black/40 border ${hobby.borderColor} ${hobby.iconColor} group-hover:scale-110 transition-transform shadow-lg`}
            >
              <i className={hobby.icon}></i>
            </div>

            <h3 className="font-orbitron text-base font-semibold text-white mb-2 group-hover:text-[#00e5ff] transition-colors">
              {hobby.title}
            </h3>

            <p className="text-xs text-[#A0A0C0] leading-relaxed font-poppins">
              {hobby.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
