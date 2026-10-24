import React from 'react';
import { SkillItem } from '../types';
import { Sparkles, ArrowUpRight, ShieldCheck, Terminal, Cpu } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillItem[];
  onSelectSkill: (skill: SkillItem) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, onSelectSkill }) => {
  const mainSkills = skills.filter((s) => !s.isGeneralLiteracy);
  const generalLiteracySkills = skills.filter((s) => s.isGeneralLiteracy);

  return (
    <section id="skills" className="relative z-10 py-20 px-[6%] max-w-[1400px] mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono-tech text-[#00e5ff] uppercase tracking-widest mb-3">
          <Sparkles size={13} className="text-[#00e5ff]" />
          <span>Interactive Capabilities Matrix</span>
        </div>
        <h2 className="section-title mb-3">Specialized Skills</h2>
        <p className="text-sm sm:text-base text-[#A0A0C0] max-w-2xl mx-auto font-poppins">
          Specialized technical competencies and domain workflows. Click any skill cell to inspect the used tools, AI-assisted methodology, and associated project deliverables.
        </p>
      </div>

      {/* Main Skills Matrix / Grid (4 Categories) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {mainSkills.map((skill) => {
          const isCyan = skill.accentColor === 'cyan';
          const isPurple = skill.accentColor === 'purple';
          const isEmerald = skill.accentColor === 'emerald';

          const hoverBorderClass = isCyan
            ? 'hover:border-[#00e5ff] hover:shadow-[0_8px_30px_rgba(0,229,255,0.15)] group-hover:text-[#00e5ff]'
            : isPurple
            ? 'hover:border-[#0090FF] hover:shadow-[0_8px_30px_rgba(0,144,255,0.15)] group-hover:text-[#0090FF]'
            : isEmerald
            ? 'hover:border-[#00ff88] hover:shadow-[0_8px_30px_rgba(0,255,136,0.15)] group-hover:text-[#00ff88]'
            : 'hover:border-[#0084ff] hover:shadow-[0_8px_30px_rgba(0,132,255,0.15)] group-hover:text-[#0084ff]';

          const iconColor = isCyan
            ? 'text-[#00e5ff]'
            : isPurple
            ? 'text-[#0090FF]'
            : isEmerald
            ? 'text-[#00ff88]'
            : 'text-[#0084ff]';

          return (
            <div
              key={skill.id}
              id={`skill-card-${skill.id}`}
              onClick={() => onSelectSkill(skill)}
              className={`group glass-panel p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden ${hoverBorderClass}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectSkill(skill);
                }
              }}
              aria-label={`View details for ${skill.name}`}
            >
              {/* Top Accent Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity ${
                  isCyan
                    ? 'bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent'
                    : isPurple
                    ? 'bg-gradient-to-r from-transparent via-[#0090FF] to-transparent'
                    : isEmerald
                    ? 'bg-gradient-to-r from-transparent via-[#00ff88] to-transparent'
                    : 'bg-gradient-to-r from-transparent via-[#0084ff] to-transparent'
                }`}
              />

              <div>
                {/* Icon & Arrow Header */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-xl transition-transform group-hover:scale-110 ${iconColor}`}
                  >
                    <i className={skill.iconName}></i>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
                    <ArrowUpRight size={15} />
                  </span>
                </div>

                {/* Category & Name */}
                <span className="text-[10px] font-mono-tech tracking-wider uppercase text-[#A0A0C0] block mb-1">
                  {skill.categoryLabel}
                </span>
                <h3 className="text-base font-orbitron font-bold text-white mb-2.5 tracking-wide leading-snug group-hover:text-[#00e5ff] transition-colors">
                  {skill.name}
                </h3>

                <p className="text-xs text-[#A0A0C0] line-clamp-3 leading-relaxed mb-4">
                  {skill.shortSummary}
                </p>
              </div>

              {/* Tools Preview & AI Indicator */}
              <div className="pt-3 border-t border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-tech text-gray-400">Tools Ecosystem:</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono-tech text-[#00e5ff]">
                    <Sparkles size={10} />
                    <span>AI Enhanced</span>
                  </span>
                </div>

                {/* Mini Tool Icons List */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {skill.tools.slice(0, 4).map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-gray-300 font-mono-tech flex items-center gap-1"
                      title={tool.name}
                    >
                      <i className={`${tool.iconValue} text-[9px]`}></i>
                      <span>{tool.name}</span>
                    </span>
                  ))}
                  {skill.tools.length > 4 && (
                    <span className="text-[10px] text-gray-400 font-mono-tech">
                      +{skill.tools.length - 4}
                    </span>
                  )}
                </div>

                {/* Prompt to click */}
                <div className="pt-2 text-right">
                  <span className="text-[10px] font-orbitron text-gray-400 group-hover:text-[#00e5ff] transition-colors flex items-center justify-end gap-1">
                    Explore Flow & Work <ArrowUpRight size={11} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* GENERAL LITERACY SECTION - KEPT DISTINCT AND SEPARATE */}
      <div id="general-literacy" className="pt-4 border-t border-white/[0.07]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono-tech text-[#0090FF] uppercase tracking-widest mb-2">
              <ShieldCheck size={13} className="text-[#0090FF]" />
              <span>Foundational Baseline</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-orbitron font-bold text-white tracking-wide">
              General Literacy
            </h3>
            <p className="text-xs sm:text-sm text-[#A0A0C0] max-w-xl font-poppins mt-1">
              Foundational computer capabilities separate from specialized domain disciplines. Essential operational proficiency in system environments and hardware architecture.
            </p>
          </div>
          <span className="text-xs font-mono-tech text-gray-400">
            2 Foundational Capabilities
          </span>
        </div>

        {/* 2 Foundational Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {generalLiteracySkills.map((skill) => {
            const isSoftware = skill.id === 'computer-software-literacy';

            return (
              <div
                key={skill.id}
                id={`skill-card-${skill.id}`}
                onClick={() => onSelectSkill(skill)}
                className="glass-panel p-6 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:border-[#0090FF]/60 hover:shadow-[0_8px_25px_rgba(0,144,255,0.12)] flex flex-col justify-between relative overflow-hidden"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectSkill(skill);
                  }
                }}
                aria-label={`View details for ${skill.name}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-lg text-[#0090FF] group-hover:scale-105 transition-transform">
                        {isSoftware ? <Terminal size={20} /> : <Cpu size={20} />}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono-tech uppercase tracking-wider text-gray-400">
                          Foundational Baseline
                        </span>
                        <h4 className="text-base font-orbitron font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                          {skill.name}
                        </h4>
                      </div>
                    </div>

                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>

                  <p className="text-xs text-[#A0A0C0] leading-relaxed mb-4">
                    {skill.shortSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {skill.tools.slice(0, 3).map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-gray-300 font-mono-tech flex items-center gap-1"
                      >
                        <i className={`${tool.iconValue} text-[9px]`}></i>
                        <span>{tool.name}</span>
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] font-orbitron text-[#0090FF] group-hover:underline flex items-center gap-1">
                    Details & Work <ArrowUpRight size={11} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
