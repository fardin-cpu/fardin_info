/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SKILL_ITEMS } from './data/skillsData';
import { SkillItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SkillsSection } from './components/SkillsSection';
import { SkillModal } from './components/SkillModal';
import { InterestsSection } from './components/InterestsSection';
import { GoalsSection } from './components/GoalsSection';
import { HobbiesSection } from './components/HobbiesSection';
import { QuoteSection } from './components/QuoteSection';
import { ContactSection } from './components/ContactSection';
import { FeedbackSection } from './components/FeedbackSection';
import { BackgroundParticles } from './components/BackgroundParticles';
import { CursorGlowAndScroll } from './components/CursorGlowAndScroll';
import { FardinAssistantChatbot } from './components/FardinAssistantChatbot';

export default function App() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const handleOpenSkill = (skill: SkillItem) => {
    setSelectedSkill(skill);
  };

  const handleCloseSkill = () => {
    setSelectedSkill(null);
  };

  return (
    <div className="min-h-screen bg-[#06060c] text-white relative font-poppins selection:bg-[#00e5ff] selection:text-[#06060c]">
      {/* Background Interactive Particles Canvas */}
      <BackgroundParticles />

      {/* Cursor Glow & Scroll Progress Line */}
      <CursorGlowAndScroll />

      {/* Top Main Navigation Bar */}
      <Navbar />

      {/* Main Sections Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* About Section: Identity Profile & Core Information */}
        <About />

        {/* NEW SKILLS SECTION: Icon-Based Matrix & General Literacy */}
        <SkillsSection
          skills={SKILL_ITEMS}
          onSelectSkill={handleOpenSkill}
        />

        {/* Interests Section */}
        <InterestsSection />

        {/* Goals Roadmap Section */}
        <GoalsSection />

        {/* Hobbies & Passions Section */}
        <HobbiesSection />

        {/* Cinematic Philosophy Quote */}
        <QuoteSection />

        {/* Contact Links */}
        <ContactSection />

        {/* Interactive Feedback & Comment Form */}
        <FeedbackSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 text-center text-xs font-mono-tech text-[#A0A0C0]">
        <div className="max-w-[1400px] mx-auto px-[6%] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse"></span>
            <span>FARDIN.TECH &copy; {new Date().getFullYear()} — Built with Precision & Care</span>
          </div>
          <div className="text-gray-400">
            Specialized Skills Matrix &bull; AI-Assisted Workflows
          </div>
        </div>
      </footer>

      {/* Interactive Skill Details & Work Modal (Flow: Skill → Tools + AI → My Work) */}
      <SkillModal
        skill={selectedSkill}
        onClose={handleCloseSkill}
      />

      {/* 24/7 Fardin's AI Assistant ChatBot */}
      <FardinAssistantChatbot />
    </div>
  );
}
