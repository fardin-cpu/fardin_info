import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative z-10 py-16 px-[6%] max-w-[1400px] mx-auto">
      <h2 className="section-title">Identity Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
        {/* Bio Box */}
        <div className="glass-panel p-6 sm:p-8 relative flex flex-col justify-between">
          <div>
            <div className="font-orbitron text-xs text-[#00e5ff] tracking-widest uppercase mb-4 flex items-center gap-2">
              <i className="fa-solid fa-user-gear"></i>
              <span>About Me :</span>
            </div>

            <div className="relative pl-5 py-2 text-white/90 text-sm sm:text-base leading-relaxed border-l-2 border-gradient-to-b from-[#00e5ff] to-[#0090FF] font-poppins">
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-[#00e5ff] to-[#0090FF]" />
              I’m someone who enjoys exploring ideas, technology, and creativity in my own way.
              I like learning new things, experimenting with digital tools, and turning curiosity
              into small creations and concepts. I’m naturally thoughtful, detail-focused, and always
              interested in discovering how things work — especially in technology, design, and modern digital culture.
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/10 font-mono-tech text-xs text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]"></span>
              <span>Status: Active Learner & Builder</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/10 font-mono-tech text-xs text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0090FF] shadow-[0_0_8px_#0090FF]"></span>
              <span>Focus: AI, Electronics, Web</span>
            </div>
          </div>
        </div>

        {/* Identity Matrix */}
        <div className="glass-panel p-6 sm:p-8 relative overflow-hidden border border-[#00e5ff]/20 shadow-[inset_0_0_30px_rgba(0,229,255,0.03)]">
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#00ffcc]/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-[#bd00ff]/15 blur-3xl rounded-full pointer-events-none" />

          <div className="font-orbitron text-xs text-[#00e5ff] tracking-widest uppercase mb-5 pb-3 border-b border-dashed border-[#00e5ff]/30 flex items-center gap-2 relative z-10">
            <i className="fa-solid fa-server"></i>
            <span>Core Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10 font-poppins">
            <div className="sm:col-span-2 bg-black/40 border border-white/5 p-3.5 rounded-xl hover:border-[#00e5ff] transition-all">
              <span className="block font-poppins text-[11px] text-[#00e5ff] font-semibold tracking-wider uppercase opacity-90">
                Full Name
              </span>
              <span className="font-poppins text-sm sm:text-base text-white font-medium">
                Md. Huzaifa Islam Fardin
              </span>
            </div>

            <div className="bg-black/40 border border-white/5 p-3.5 rounded-xl hover:border-[#00e5ff] transition-all">
              <span className="block font-poppins text-[11px] text-[#00e5ff] font-semibold tracking-wider uppercase opacity-90">
                Birthdate
              </span>
              <span className="font-poppins text-sm text-white font-medium">
                29 March, 2009
              </span>
            </div>

            <div className="bg-black/40 border border-white/5 p-3.5 rounded-xl hover:border-[#00e5ff] transition-all">
              <span className="block font-poppins text-[11px] text-[#00e5ff] font-semibold tracking-wider uppercase opacity-90">
                Blood Group
              </span>
              <span className="font-poppins text-sm text-white font-medium">
                O+
              </span>
            </div>

            <div className="bg-black/40 border border-white/5 p-3.5 rounded-xl hover:border-[#00e5ff] transition-all">
              <span className="block font-poppins text-[11px] text-[#00e5ff] font-semibold tracking-wider uppercase opacity-90">
                Nationality
              </span>
              <span className="font-poppins text-sm text-white font-medium">
                Bangladeshi
              </span>
            </div>

            <div className="bg-black/40 border border-white/5 p-3.5 rounded-xl hover:border-[#00e5ff] transition-all">
              <span className="block font-poppins text-[11px] text-[#00e5ff] font-semibold tracking-wider uppercase opacity-90">
                Religion
              </span>
              <span className="font-poppins text-sm text-white font-medium">
                Islam
              </span>
            </div>

            <div className="sm:col-span-2 bg-black/40 border border-white/5 p-3.5 rounded-xl hover:border-[#00e5ff] transition-all">
              <span className="block font-poppins text-[11px] text-[#00e5ff] font-semibold tracking-wider uppercase opacity-90">
                Address
              </span>
              <span className="font-poppins text-sm text-white font-medium">
                Jamirdia, Bhaluka, Mymensingh
              </span>
            </div>

            <div className="sm:col-span-2 bg-black/40 border border-white/5 p-3.5 rounded-xl hover:border-[#00e5ff] transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="block font-poppins text-[11px] text-[#00e5ff] font-semibold tracking-wider uppercase opacity-90">
                  Educational Status
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono-tech text-xs font-semibold shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center gap-1">
                  <span>GPA 5.00</span>
                </span>
              </div>
              <span className="font-poppins text-sm text-white font-medium">
                Passed SSC Examination
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
