import React, { useState, useEffect, useRef } from 'react';
import { Camera, UploadCloud, Check, RotateCcw, Lock, KeyRound, X, Image as ImageIcon } from 'lucide-react';
import { getCustomAvatar, setCustomAvatar, resetCustomAvatar, isOwnerAuthenticated, authenticateOwner, logoutOwner } from '../utils/storage';
import { subscribeToSiteAvatar } from '../lib/firebase';
import defaultAiAvatar from '../assets/images/fardin_portrait_art_1789490548955.jpg';

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [fadeWelcome, setFadeWelcome] = useState(0);
  const [avatarSrc, setAvatarSrc] = useState<string>(defaultAiAvatar);
  const [isOwner, setIsOwner] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mobile secret tap trigger
  const [tapCount, setTapCount] = useState(0);
  const [showMobilePinModal, setShowMobilePinModal] = useState(false);
  const [mobilePinInput, setMobilePinInput] = useState('');
  const [mobilePinError, setMobilePinError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Load avatar & subscribe to Cloud Firestore
  useEffect(() => {
    setIsOwner(isOwnerAuthenticated());
    const custom = getCustomAvatar();
    if (custom) {
      setAvatarSrc(custom);
    } else {
      setAvatarSrc(defaultAiAvatar);
    }

    // Subscribe to cloud avatar updates
    const unsubscribe = subscribeToSiteAvatar((cloudAvatar) => {
      if (cloudAvatar && cloudAvatar.trim().length > 0) {
        setAvatarSrc(cloudAvatar);
        try {
          localStorage.setItem('fardin_portfolio_avatar_custom', cloudAvatar);
        } catch {
          // ignore
        }
      } else if (cloudAvatar === '') {
        setAvatarSrc(defaultAiAvatar);
        try {
          localStorage.removeItem('fardin_portfolio_avatar_custom');
        } catch {
          // ignore
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to owner login events from elsewhere or shortcuts
  useEffect(() => {
    const checkAuth = () => {
      setIsOwner(isOwnerAuthenticated());
    };
    window.addEventListener('storage', checkAuth);
    const interval = setInterval(checkAuth, 1000);
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  // Handle secret 4-tap trigger on avatar (perfect for mobile touchscreens!)
  const handleAvatarTap = () => {
    if (isOwner) {
      // If already owner, tapping directly opens file picker on mobile
      fileInputRef.current?.click();
      return;
    }
    setTapCount((prev) => {
      const next = prev + 1;
      if (next >= 4) {
        setShowMobilePinModal(true);
        setMobilePinInput('');
        setMobilePinError('');
        return 0;
      }
      return next;
    });
  };

  const handleMobilePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setMobilePinError('');
    try {
      const ok = await authenticateOwner(mobilePinInput);
      if (ok) {
        setIsOwner(true);
        setShowMobilePinModal(false);
        setMobilePinInput('');
      } else {
        setMobilePinError('Incorrect PIN');
      }
    } catch {
      setMobilePinError('Verification error');
    } finally {
      setIsVerifying(false);
    }
  };

  // Process and crop image file
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 500;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Center crop square
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        const compressed = canvas.toDataURL('image/jpeg', 0.9);
        setCustomAvatar(compressed);
        setAvatarSrc(compressed);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3500);
      };
      if (typeof event.target?.result === 'string') {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processImageFile(file);
    }
  };

  const handleResetToDefault = () => {
    resetCustomAvatar();
    setAvatarSrc(defaultAiAvatar);
  };

  const roles = ['Student', 'Tech Enthusiast', 'Learner', 'Creative Explorer'];

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        const nextText = isDeleting
          ? currentRole.substring(0, displayedText.length - 1)
          : currentRole.substring(0, displayedText.length + 1);
        setDisplayedText(nextText);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  // Welcome alternate text
  useEffect(() => {
    const welcomeInterval = setInterval(() => {
      setFadeWelcome((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(welcomeInterval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between gap-10 pt-28 pb-16 px-[6%] max-w-[1400px] mx-auto relative z-10"
    >
      <div className="w-full lg:max-w-[58%] text-center lg:text-left">
        {/* Animated Subtitle Header */}
        <div className="h-6 mb-3 overflow-hidden">
          <div
            className={`font-orbitron text-xs sm:text-sm tracking-[3px] font-semibold text-[#00e5ff] transition-opacity duration-700 ${
              fadeWelcome === 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {fadeWelcome === 0 ? "GLAD YOU'RE HERE" : "LET ME INTRODUCE MYSELF"}
          </div>
        </div>

        <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-white via-white to-[#00e5ff] bg-clip-text text-transparent">
          Hi, I'm Fardin
        </h1>

        {/* Dynamic Typing Roles */}
        <div className="text-xl sm:text-2xl font-orbitron font-semibold text-[#0090FF] min-h-[36px] mb-4 flex items-center justify-center lg:justify-start gap-1">
          <span>{displayedText}</span>
          <span className="w-2.5 h-6 bg-[#00e5ff] animate-pulse"></span>
        </div>

        <p className="text-[#A0A0C0] text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 font-poppins">
          Merging thought, design, and technology into one flow. Creating experiences beyond conventional boundaries with specialized engineering and AI-assisted workflows.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
          <a
            href="#skills"
            id="hero-skills-btn"
            className="btn-premium btn-cyan shadow-[0_0_15px_rgba(0,229,255,0.25)]"
          >
            <i className="fa-solid fa-layer-group text-xs mr-1"></i>
            <span>Explore Skills Matrix</span>
          </a>
          <a href="#about" className="btn-premium btn-purple">
            <span>Identity Profile</span>
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full text-xs font-orbitron text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
          >
            <span>Establish Link</span>
          </a>
        </div>
      </div>

      {/* Floating Neon Avatar Visual */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center items-center">
        <div
          onClick={handleAvatarTap}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative float-avatar group transition-transform cursor-pointer ${isDragging ? 'scale-105' : ''}`}
        >
          {/* Neon Glow Rings */}
          <div className={`absolute -inset-2 rounded-full bg-gradient-to-r ${isDragging ? 'from-[#00e5ff] to-[#00ff88] blur-2xl opacity-90 animate-pulse' : 'from-[#00e5ff]/30 to-[#0090FF]/30 blur-xl opacity-70 animate-pulse'}`}></div>

          <div className={`w-56 h-56 sm:w-64 sm:h-64 rounded-full p-[3px] bg-gradient-to-tr ${isDragging ? 'from-[#00e5ff] via-[#00ff88] to-[#0090FF]' : 'from-[#00e5ff] via-[#0084ff] to-[#bd00ff]'} shadow-[0_0_35px_rgba(0,229,255,0.25)] relative z-10 transition-all`}>
            <div className="w-full h-full rounded-full bg-[#0d0d18] flex items-center justify-center overflow-hidden border border-white/10 relative">
              {avatarSrc && (
                <div 
                  className="w-full h-full relative select-none"
                  onContextMenu={(e) => {
                    // Prevent right-click save menu
                    if (!isOwner) e.preventDefault();
                  }}
                >
                  <img
                    src={avatarSrc}
                    alt="Md. Huzaifa Islam Fardin"
                    draggable="false"
                    onContextMenu={(e) => {
                      if (!isOwner) e.preventDefault();
                    }}
                    className={`w-full h-full object-cover rounded-full transition-opacity select-none pointer-events-none ${isDragging ? 'opacity-30' : 'opacity-100'}`}
                    style={{
                      WebkitTouchCallout: 'none',
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement?.parentElement;
                      if (parent && !parent.querySelector('.fallback-avatar')) {
                        const fallback = document.createElement('div');
                        fallback.className =
                          'fallback-avatar flex flex-col items-center justify-center text-center p-4 text-[#00e5ff]';
                        fallback.innerHTML = `
                          <i class="fa-solid fa-user-astronaut text-5xl mb-2 text-[#00e5ff]"></i>
                          <span class="font-orbitron font-bold text-sm tracking-widest text-white">FARDIN</span>
                          <span class="font-mono-tech text-[10px] text-[#A0A0C0]">SYSTEM ONLINE</span>
                        `;
                        parent.appendChild(fallback);
                      }
                    }}
                  />

                  {/* Watermark & Anti-Download Protective Glass Overlay */}
                  <div 
                    className="absolute inset-0 rounded-full pointer-events-none flex flex-col justify-end items-center pb-3 overflow-hidden bg-gradient-to-t from-black/40 via-transparent to-transparent"
                    style={{
                      WebkitTouchCallout: 'none',
                      userSelect: 'none'
                    }}
                  >
                    {/* Security Micro Grid Texture */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
                    
                    {/* Watermark Stamp */}
                    <span className="relative z-10 text-[9px] font-orbitron tracking-widest font-bold text-white/50 bg-black/40 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-sm select-none">
                      &copy; FARDIN.TECH
                    </span>
                  </div>
                </div>
              )}

              {/* Drag Over Active Overlay */}
              {isDragging && (
                <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-4 text-center z-30 border-2 border-dashed border-[#00e5ff] rounded-full">
                  <UploadCloud className="w-10 h-10 text-[#00e5ff] animate-bounce mb-1" />
                  <span className="text-xs font-orbitron font-bold text-white tracking-widest uppercase">
                    Drop Photo Here
                  </span>
                  <span className="text-[10px] font-mono-tech text-[#00e5ff] mt-0.5">
                    Release to apply
                  </span>
                </div>
              )}

              {/* Hidden File Input for click / drag upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />

              {/* Hover Overlay when owner */}
              {isOwner && !isDragging && (
                <div
                  title="Click to choose from Gallery"
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[#00e5ff] cursor-pointer"
                >
                  <Camera size={26} className="mb-1" />
                  <span className="text-[10px] font-orbitron font-bold text-white tracking-wider uppercase">
                    Change Photo
                  </span>
                  <span className="text-[9px] font-mono-tech text-gray-300">
                    Tap to select from Gallery
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick upload badge when in Owner mode */}
          {isOwner && (
            <div className="absolute bottom-1 right-1 z-20 flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="w-9 h-9 rounded-full bg-[#00e5ff] text-black shadow-[0_0_15px_#00e5ff] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                title="Upload Profile Picture"
              >
                <Camera size={16} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleResetToDefault();
                }}
                className="w-7 h-7 rounded-full bg-black/80 border border-white/20 text-gray-400 hover:text-white shadow-md flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                title="Reset to Default AI Avatar"
              >
                <RotateCcw size={11} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile & Desktop Owner Action Bar */}
        {isOwner && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 z-20">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-premium btn-cyan py-2 px-4 text-xs font-orbitron flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            >
              <ImageIcon size={14} />
              <span>গ্যালারি থেকে ছবি দিন</span>
            </button>
            <button
              onClick={() => {
                logoutOwner();
                setIsOwner(false);
              }}
              className="py-2 px-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-mono-tech flex items-center gap-1 border border-white/10"
              title="Lock Owner Mode"
            >
              <Lock size={12} />
              <span>Lock</span>
            </button>
          </div>
        )}

        {/* Upload Success Feedback Toast */}
        {uploadSuccess && (
          <div className="mt-3 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono-tech text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-fadeIn">
            <Check size={13} className="text-emerald-400" />
            <span>Profile photo updated successfully!</span>
          </div>
        )}

        {/* Secret Owner Unlock Modal (Mobile Friendly) */}
        {showMobilePinModal && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowMobilePinModal(false);
            }}
          >
            <div className="w-full max-w-sm p-6 rounded-2xl bg-[#0d0d18] border border-[#00e5ff]/40 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff] flex items-center justify-center border border-[#00e5ff]/30">
                    <KeyRound size={16} />
                  </div>
                  <div>
                    <h5 className="text-sm font-orbitron font-bold text-white">Owner Access</h5>
                    <p className="text-[10px] text-gray-400 font-mono-tech">Enter PIN to upload from phone</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMobilePinModal(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleMobilePinSubmit} className="space-y-3">
                <input
                  type="password"
                  inputMode="numeric"
                  autoFocus
                  placeholder="Enter Secret PIN"
                  value={mobilePinInput}
                  onChange={(e) => {
                    setMobilePinInput(e.target.value);
                    setMobilePinError('');
                  }}
                  className="w-full bg-black/60 border border-white/20 focus:border-[#00e5ff] rounded-xl px-4 py-3 text-center text-lg tracking-widest text-white focus:outline-none font-mono-tech"
                />

                {mobilePinError && (
                  <p className="text-xs text-red-400 text-center font-mono-tech">
                    {mobilePinError}
                  </p>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowMobilePinModal(false)}
                    className="px-3 py-2 text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="btn-premium btn-cyan py-2 px-5 text-xs font-orbitron"
                  >
                    {isVerifying ? 'Verifying...' : 'Unlock'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
