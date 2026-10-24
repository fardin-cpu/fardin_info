import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onLanguageToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check active section
      const sections = ['about', 'skills', 'interests', 'goals', 'hobbies', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills', isNew: true },
    { label: 'Interests', href: '#interests', id: 'interests' },
    { label: 'Goals', href: '#goals', id: 'goals' },
    { label: 'Hobbies', href: '#hobbies', id: 'hobbies' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full px-[6%] py-4 z-50 transition-all duration-300 flex items-center justify-between border-b ${
        isScrolled
          ? 'bg-[#06060c]/90 backdrop-blur-xl border-[#00e5ff]/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-white/[0.04]'
      }`}
    >
      <a
        href="#"
        className="font-orbitron font-extrabold text-lg sm:text-xl tracking-widest bg-gradient-to-r from-[#00e5ff] to-[#0084ff] bg-clip-text text-transparent"
      >
        Fardin.Tech
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              className={`font-orbitron text-xs tracking-wider transition-colors relative py-1 ${
                isActive
                  ? 'text-[#00e5ff] font-semibold drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]'
                  : 'text-[#A0A0C0] hover:text-[#00e5ff]'
              }`}
            >
              {link.label}
              {link.isNew && (
                <span className="ml-1 text-[9px] font-mono-tech px-1.5 py-0.2 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30">
                  NEW
                </span>
              )}
            </a>
          );
        })}

        <a
          href="#bn"
          onClick={(e) => {
            e.preventDefault();
            alert('বাংলা অনুবাদ সংস্করণ শীঘ্রই উপলব্ধ হবে (Bangla translation view is currently synchronized).');
          }}
          className="border border-[#00e5ff] px-3.5 py-1.5 rounded-full text-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#06060c] font-orbitron text-xs transition-all duration-300 flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]"
        >
          <i className="fa-solid fa-globe text-[11px]"></i>
          <span>বাংলা</span>
        </a>
      </div>

      {/* Mobile Hamburger Toggle */}
      <button
        id="mobile-nav-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden w-7 h-5 flex flex-col justify-between items-center z-50 focus:outline-none"
        aria-label="Toggle Navigation Menu"
      >
        <span
          className={`h-0.5 w-full bg-white transition-all duration-300 rounded ${
            mobileMenuOpen ? 'rotate-45 translate-y-2 bg-[#00e5ff]' : ''
          }`}
        ></span>
        <span
          className={`h-0.5 w-full bg-white transition-opacity duration-300 rounded ${
            mobileMenuOpen ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
        <span
          className={`h-0.5 w-full bg-white transition-all duration-300 rounded ${
            mobileMenuOpen ? '-rotate-45 -translate-y-2.5 bg-[#00e5ff]' : ''
          }`}
        ></span>
      </button>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 w-3/4 max-w-xs h-screen bg-[#06060c]/98 backdrop-blur-2xl border-l border-white/10 p-8 flex flex-col justify-center gap-6 z-40 transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="font-orbitron text-lg font-bold text-[#00e5ff] mb-2 tracking-wider">
          NAVIGATION
        </div>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="font-orbitron text-sm tracking-wider text-gray-300 hover:text-[#00e5ff] transition-colors py-1 flex items-center justify-between"
          >
            <span>{link.label}</span>
            {link.isNew && (
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#00e5ff]/20 text-[#00e5ff]">
                NEW
              </span>
            )}
          </a>
        ))}

        <a
          href="#bn"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            alert('বাংলা সংস্করণ শীঘ্রই আসছে!');
          }}
          className="mt-4 border border-[#00e5ff] py-2.5 px-4 rounded-xl text-center text-[#00e5ff] font-orbitron text-xs"
        >
          <i className="fa-solid fa-globe mr-2"></i> বাংলা ভাষা
        </a>
      </div>
    </nav>
  );
};
