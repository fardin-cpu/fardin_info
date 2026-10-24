import React from 'react';

export const ContactSection: React.FC = () => {
  const socials = [
    {
      id: 'email',
      title: 'Gmail',
      href: 'mailto:mdfardin20101@gmail.com',
      icon: 'fa-solid fa-envelope',
      hoverClass: 'hover:bg-[#ea4335] hover:text-white hover:shadow-[0_0_15px_#ea4335]'
    },
    {
      id: 'phone',
      title: 'Call Me',
      href: 'tel:+8801645282868',
      icon: 'fa-solid fa-phone',
      hoverClass: 'hover:bg-[#00e5ff] hover:text-[#06060c] hover:shadow-[0_0_15px_#00e5ff]'
    },
    {
      id: 'x-twitter',
      title: 'X (Twitter)',
      href: 'https://x.com/mdfardin20101',
      icon: 'fa-brands fa-x-twitter',
      hoverClass: 'hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]'
    },
    {
      id: 'facebook',
      title: 'Facebook',
      href: 'https://www.facebook.com/md.fardin.179815',
      icon: 'fa-brands fa-facebook',
      hoverClass: 'hover:bg-[#1877F2] hover:text-white hover:shadow-[0_0_15px_#1877F2]'
    },
    {
      id: 'instagram',
      title: 'Instagram',
      href: 'https://www.instagram.com/md_fardin_2010?igsh=MXJ1aWd4MHV1NjNyNw==',
      icon: 'fa-brands fa-instagram',
      hoverClass: 'hover:bg-[#dc2743] hover:text-white hover:shadow-[0_0_15px_#dc2743]'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      href: 'https://wa.me/qr/PN34JMARK4WXF1',
      icon: 'fa-brands fa-whatsapp',
      hoverClass: 'hover:bg-[#25D366] hover:text-white hover:shadow-[0_0_15px_#25D366]'
    }
  ];

  return (
    <section id="contact" className="relative z-10 py-16 px-[6%] text-center max-w-[1400px] mx-auto">
      <h2 className="section-title">Establish Link</h2>
      <p className="text-[#A0A0C0] text-sm max-w-md mx-auto mb-8 font-poppins">
        Interested in collaborating or exploring new ideas? You’ll find my contact channels below.
      </p>

      <div className="flex justify-center flex-wrap gap-4">
        {socials.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target={item.href.startsWith('mailto') || item.href.startsWith('tel') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            title={item.title}
            aria-label={item.title}
            className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center text-lg text-white transition-all duration-300 hover:-translate-y-1 ${item.hoverClass}`}
          >
            <i className={item.icon}></i>
          </a>
        ))}
      </div>
    </section>
  );
};
