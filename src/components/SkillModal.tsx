import React, { useState, useEffect } from 'react';
import { SkillItem, WorkItem } from '../types';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Wrench,
  Layers,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  Lock,
  Unlock,
  KeyRound,
  Copy,
  Check,
  ShieldCheck,
  Cloud,
  CloudCheck
} from 'lucide-react';
import {
  getWorksForSkill,
  saveWorksLocallyOnly,
  upsertWorkItem,
  deleteWorkItem,
  resetWorksForSkill,
  isOwnerAuthenticated,
  authenticateOwner,
  logoutOwner,
  setCustomOwnerPin
} from '../utils/storage';
import { subscribeToSkillWorks } from '../lib/firebase';

interface SkillModalProps {
  skill: SkillItem | null;
  onClose: () => void;
  initialTab?: 'overview' | 'work';
}

export const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose, initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'work'>(initialTab);
  const [projectsList, setProjectsList] = useState<WorkItem[]>([]);

  // Owner Authentication State
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Change PIN State
  const [showChangePin, setShowChangePin] = useState<boolean>(false);
  const [newPinInput, setNewPinInput] = useState<string>('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState<string>('');

  // Secret Multi-click trigger
  const [secretClicks, setSecretClicks] = useState<number>(0);

  const handleSecretIconClick = () => {
    if (isOwner) return;
    setSecretClicks((prev) => {
      const next = prev + 1;
      if (next >= 4) {
        setShowPinModal(true);
        setPinInput('');
        setPinError('');
        return 0;
      }
      return next;
    });
  };

  // Check URL parameters for ?owner=1 or #owner
  useEffect(() => {
    try {
      const search = window.location.search;
      const hash = window.location.hash;
      if (search.includes('owner=1') || hash.includes('owner')) {
        if (!isOwnerAuthenticated()) {
          setShowPinModal(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Global key combination (Ctrl + Shift + E or Alt + E)
  useEffect(() => {
    const handleGlobalSecretKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') || (e.altKey && e.key.toLowerCase() === 'e')) {
        e.preventDefault();
        setShowPinModal(true);
        setPinInput('');
        setPinError('');
      }
    };
    window.addEventListener('keydown', handleGlobalSecretKey);
    return () => window.removeEventListener('keydown', handleGlobalSecretKey);
  }, []);

  // Project Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formLinkUrl, setFormLinkUrl] = useState('');
  const [formLinkLabel, setFormLinkLabel] = useState('Open Project');
  const [formDeliverables, setFormDeliverables] = useState('');
  const [formTechStack, setFormTechStack] = useState('');
  const [formLiveStatus, setFormLiveStatus] = useState('Completed');
  const [cloudSyncState, setCloudSyncState] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Load works & auth status whenever modal opens or skill changes
  useEffect(() => {
    setIsOwner(isOwnerAuthenticated());
    setConfirmDeleteId(null);
    setShowResetConfirm(false);
    if (skill) {
      // 1. Initial fast local read
      setProjectsList(getWorksForSkill(skill.id));
      setIsEditing(false);
      setEditingProjectId(null);

      // 2. Real-time Cloud Firestore subscription
      const unsubscribe = subscribeToSkillWorks(skill.id, (cloudWorks) => {
        if (cloudWorks !== null && Array.isArray(cloudWorks)) {
          setProjectsList(cloudWorks);
          saveWorksLocallyOnly(skill.id, cloudWorks);
        }
      });

      return () => unsubscribe();
    }
    setActiveTab(initialTab);
  }, [skill, initialTab]);

  // Handle PIN verification (with salted SHA-256)
  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setPinError('');
    try {
      const valid = await authenticateOwner(pinInput);
      if (valid) {
        setIsOwner(true);
        setShowPinModal(false);
        setPinInput('');
      } else {
        setPinError('Incorrect Owner PIN.');
      }
    } catch {
      setPinError('Authentication error. Try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUpdatePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.trim().length < 4) {
      setPinError('PIN must be at least 4 characters');
      return;
    }
    const success = await setCustomOwnerPin(newPinInput.trim());
    if (success) {
      setPinSuccessMsg('PIN updated successfully!');
      setTimeout(() => {
        setShowChangePin(false);
        setNewPinInput('');
        setPinSuccessMsg('');
      }, 1500);
    }
  };

  const handleLogoutOwner = () => {
    logoutOwner();
    setIsOwner(false);
    setIsEditing(false);
    setShowChangePin(false);
  };

  const handleCopyCodebaseJson = () => {
    navigator.clipboard.writeText(JSON.stringify(projectsList, null, 2));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isEditing) {
          setIsEditing(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isEditing]);

  if (!skill) return null;

  const isCyan = skill.accentColor === 'cyan';
  const isPurple = skill.accentColor === 'purple';
  const isEmerald = skill.accentColor === 'emerald';

  const accentColorClass = isCyan
    ? 'text-[#00e5ff] border-[#00e5ff]'
    : isPurple
    ? 'text-[#0090FF] border-[#0090FF]'
    : isEmerald
    ? 'text-[#00ff88] border-[#00ff88]'
    : 'text-[#0084ff] border-[#0084ff]';

  const accentGlowBorder = isCyan
    ? 'border-[#00e5ff]/40 shadow-[0_0_25px_rgba(0,229,255,0.15)]'
    : isPurple
    ? 'border-[#0090FF]/40 shadow-[0_0_25px_rgba(0,144,255,0.15)]'
    : isEmerald
    ? 'border-[#00ff88]/40 shadow-[0_0_25px_rgba(0,255,136,0.15)]'
    : 'border-[#0084ff]/40 shadow-[0_0_25px_rgba(0,132,255,0.15)]';

  const accentBadgeBg = isCyan
    ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30'
    : isPurple
    ? 'bg-[#0090FF]/10 text-[#0090FF] border-[#0090FF]/30'
    : isEmerald
    ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30'
    : 'bg-[#0084ff]/10 text-[#0084ff] border-[#0084ff]/30';

  // Open editor for new work
  const handleStartAdd = () => {
    setEditingProjectId(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormDescription('');
    setFormLinkUrl('');
    setFormLinkLabel('Open Project');
    setFormDeliverables('');
    setFormTechStack('');
    setFormLiveStatus('Completed');
    setIsEditing(true);
  };

  // Open editor for existing work
  const handleStartEdit = (proj: WorkItem) => {
    setEditingProjectId(proj.id);
    setFormTitle(proj.title);
    setFormSubtitle(proj.subtitle || '');
    setFormDescription(proj.description || '');
    setFormLinkUrl(proj.linkUrl || '');
    setFormLinkLabel(proj.linkLabel || 'Open Project');
    setFormDeliverables(proj.deliverables ? proj.deliverables.join('\n') : '');
    setFormTechStack(proj.techStack ? proj.techStack.join(', ') : '');
    setFormLiveStatus(proj.liveStatus || 'Completed');
    setIsEditing(true);
  };

  // Save work item to localStorage
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const deliverablesArray = formDeliverables
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean);

    const techStackArray = formTechStack
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const itemToSave: WorkItem = {
      id: editingProjectId || `work-${Date.now()}`,
      title: formTitle.trim(),
      subtitle: formSubtitle.trim() || undefined,
      description: formDescription.trim(),
      linkUrl: formLinkUrl.trim() || undefined,
      linkLabel: formLinkLabel.trim() || 'Open Project',
      deliverables: deliverablesArray.length > 0 ? deliverablesArray : undefined,
      techStack: techStackArray.length > 0 ? techStackArray : undefined,
      liveStatus: formLiveStatus.trim() || undefined
    };

    const updated = upsertWorkItem(skill.id, itemToSave);
    setProjectsList(updated);
    setIsEditing(false);
    setEditingProjectId(null);
    setCloudSyncState('syncing');
    setTimeout(() => {
      setCloudSyncState('synced');
      setTimeout(() => setCloudSyncState('idle'), 4000);
    }, 500);
  };

  // Delete work item (instant local + Cloud Firestore sync)
  const handleConfirmDelete = (workId: string) => {
    if (!skill) return;
    setConfirmDeleteId(null);
    const updated = deleteWorkItem(skill.id, workId);
    setProjectsList(updated);
    setCloudSyncState('syncing');
    setTimeout(() => {
      setCloudSyncState('synced');
      setTimeout(() => setCloudSyncState('idle'), 3000);
    }, 400);
  };

  // Reset to default template works
  const handleConfirmReset = () => {
    if (!skill) return;
    setShowResetConfirm(false);
    const reset = resetWorksForSkill(skill.id);
    setProjectsList(reset);
    setIsEditing(false);
    setCloudSyncState('synced');
    setTimeout(() => setCloudSyncState('idle'), 3000);
  };

  return (
    <div
      id="skill-modal-backdrop"
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-skill-title"
    >
      <div
        id="skill-modal-card"
        className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#090915] border ${accentGlowBorder} p-5 sm:p-8 text-white shadow-2xl transition-all duration-300`}
      >
        {/* Top Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              onClick={handleSecretIconClick}
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-white/[0.03] border border-white/10 ${accentColorClass} cursor-pointer select-none`}
              title="Skill Matrix Item"
            >
              <i className={skill.iconName}></i>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] tracking-widest font-mono-tech px-2.5 py-0.5 rounded-full border ${accentBadgeBg} uppercase`}>
                  {skill.categoryLabel}
                </span>
                {skill.isGeneralLiteracy && (
                  <span className="text-[10px] tracking-wider font-mono-tech px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                    Foundational
                  </span>
                )}
              </div>
              <h3 id="modal-skill-title" className="text-xl sm:text-2xl font-orbitron font-bold tracking-wide text-white">
                {skill.name}
              </h3>
            </div>
          </div>

          <button
            id="close-skill-modal-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Flow Navigation Pill */}
        <div className="my-5 flex items-center justify-between p-1.5 rounded-xl bg-black/40 border border-white/10">
          <button
            id="tab-tools-btn"
            onClick={() => {
              setActiveTab('overview');
              setIsEditing(false);
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-white/10 text-white shadow-sm border border-white/10 font-orbitron'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Wrench size={14} className={activeTab === 'overview' ? accentColorClass : ''} />
            <span>Tools & AI Workflow</span>
          </button>

          <button
            id="tab-work-btn"
            onClick={() => setActiveTab('work')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'work'
                ? 'bg-white/10 text-white shadow-sm border border-white/10 font-orbitron'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers size={14} className={activeTab === 'work' ? accentColorClass : ''} />
            <span>My Works ({projectsList.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW, TOOLS & AI */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* What I Do Summary */}
            <div className="rounded-xl p-4 bg-white/[0.02] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00e5ff] to-[#0090FF]" />
              <h4 className="text-xs uppercase font-mono-tech tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                <Cpu size={14} className="text-[#00e5ff]" />
                Summary & Focus Area
              </h4>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                {skill.detailedOverview}
              </p>
            </div>

            {/* Tools & AI Indicator Section */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs uppercase font-mono-tech tracking-wider text-gray-300 flex items-center gap-2">
                  <Wrench size={14} className="text-[#00e5ff]" />
                  Primary Tools & Ecosystem
                </h4>

                {/* AI Indicator beside tools */}
                <div
                  id="ai-indicator-badge"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#00e5ff]/15 to-[#0090FF]/15 border border-[#00e5ff]/30 text-xs text-[#00e5ff] font-mono-tech shadow-[0_0_12px_rgba(0,229,255,0.15)]"
                  title="AI assistance is actively involved throughout my work with these tools"
                >
                  <Sparkles size={13} className="animate-pulse text-[#00e5ff]" />
                  <span className="font-semibold tracking-wide">AI-Assisted Throughout</span>
                </div>
              </div>

              {/* Recognized Tools Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {skill.tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-black/50 border border-white/[0.07] hover:border-white/20 transition-all hover:-translate-y-0.5 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-base text-gray-300 group-hover:text-[#00e5ff] transition-colors">
                      <i className={tool.iconValue}></i>
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-medium text-white truncate">{tool.name}</div>
                      <div className="text-[10px] text-gray-400 truncate">{tool.role}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Assistance Context Callout */}
              <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-br from-[#00e5ff]/[0.05] to-[#bd00ff]/[0.03] border border-[#00e5ff]/20">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles size={14} className="text-[#00e5ff]" />
                  <span className="text-xs font-orbitron font-semibold text-white tracking-wide">
                    How AI Augments My Work in {skill.name}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-2">
                  {skill.aiWorkflow.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skill.aiWorkflow.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-gray-300 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"></span>
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Button: View My Work */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono-tech text-gray-400">
                Flow: Skill → Tools + AI → <span className="text-[#00e5ff]">My Work</span>
              </span>
              <div className="flex items-center gap-2">
                {skill.directWorkUrl && (
                  <a
                    href={skill.directWorkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-[#00e5ff] text-xs font-orbitron flex items-center gap-1.5 transition-colors"
                  >
                    <span>Direct Link</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                <button
                  id="explore-work-btn"
                  onClick={() => setActiveTab('work')}
                  className="btn-premium btn-cyan py-2.5 px-5 text-xs tracking-wider font-orbitron flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                >
                  <span>View My Work</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RELEVANT WORK & IN-APP PROJECT MANAGER */}
        {activeTab === 'work' && (
          <div className="space-y-4">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
              <div>
                <h4 className="text-sm font-orbitron font-bold text-white flex items-center gap-2">
                  <span>Projects & Artifacts</span>
                  <span className="text-xs font-mono-tech px-2 py-0.5 rounded bg-white/5 text-gray-400">
                    {projectsList.length}
                  </span>
                  {isOwner && (
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 flex items-center gap-1">
                      <Unlock size={10} />
                      <span>Owner Mode</span>
                    </span>
                  )}
                  {cloudSyncState === 'syncing' ? (
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30 flex items-center gap-1 animate-pulse">
                      <Cloud size={10} />
                      <span>Syncing to Cloud...</span>
                    </span>
                  ) : cloudSyncState === 'synced' ? (
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                      <CloudCheck size={10} />
                      <span>Saved to Cloud!</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1" title="Connected to Google Firebase Cloud Firestore">
                      <Cloud size={10} />
                      <span>Cloud Live</span>
                    </span>
                  )}
                </h4>
                <p className="text-[11px] text-gray-400 font-mono-tech">
                  {isOwner
                    ? 'Owner privileges enabled: Add, update, or remove projects directly.'
                    : 'Selected deliverables and projects developed with this skill set.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {isOwner && !isEditing && (
                  <>
                    <button
                      id="add-custom-project-btn"
                      onClick={handleStartAdd}
                      className="btn-premium btn-cyan py-1.5 px-3 text-[11px] font-orbitron flex items-center gap-1.5"
                    >
                      <Plus size={13} />
                      <span>Add Project</span>
                    </button>
                    <button
                      onClick={handleCopyCodebaseJson}
                      title="Copy JSON for permanent code embedding"
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-gray-300 flex items-center gap-1 font-mono-tech"
                    >
                      {copiedCode ? <Check size={12} className="text-[#00e5ff]" /> : <Copy size={12} />}
                      <span>{copiedCode ? 'Copied' : 'JSON'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowChangePin(true);
                        setNewPinInput('');
                        setPinError('');
                      }}
                      title="Update Owner PIN"
                      className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-[11px] font-mono-tech flex items-center gap-1"
                    >
                      <KeyRound size={11} />
                      <span>PIN</span>
                    </button>
                    <button
                      onClick={handleLogoutOwner}
                      title="Lock & Exit Owner Mode"
                      className="px-2 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-[11px] font-mono-tech flex items-center gap-1"
                    >
                      <Lock size={11} />
                      <span>Lock</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setActiveTab('overview');
                    setIsEditing(false);
                  }}
                  className="text-xs text-[#00e5ff] hover:underline flex items-center gap-1 font-mono-tech px-2 py-1"
                >
                  <ArrowLeft size={12} />
                  <span>Tools & AI</span>
                </button>
              </div>
            </div>

            {/* IN-APP PROJECT CREATOR / EDITOR FORM (OWNER ONLY) */}
            {isOwner && isEditing && (
              <form
                onSubmit={handleSaveProject}
                className="rounded-xl p-5 bg-black/60 border border-[#00e5ff]/40 space-y-4 shadow-[0_0_20px_rgba(0,229,255,0.1)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-orbitron font-bold text-[#00e5ff] uppercase tracking-wider">
                    {editingProjectId ? 'Edit Project Details' : 'Add New Project'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono-tech text-gray-300">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. My ESP32 Sensor Hub"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono-tech text-gray-300">
                      Subtitle / Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. IoT Hardware & Firmware"
                      value={formSubtitle}
                      onChange={(e) => setFormSubtitle(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono-tech text-gray-300">
                      Project Link (GitHub / Drive / Live Demo)
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/... or Google Drive"
                      value={formLinkUrl}
                      onChange={(e) => setFormLinkUrl(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono-tech text-gray-300">
                      Button Label
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. View on GitHub, Download PDF"
                      value={formLinkLabel}
                      onChange={(e) => setFormLinkLabel(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-mono-tech text-gray-300">
                      Description / Summary
                    </label>
                    <textarea
                      rows={2}
                      placeholder="What did you build, solve, or design in this project?"
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e5ff] resize-none"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-mono-tech text-gray-300">
                      Key Highlights / Deliverables (One per line)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="2-layer PCB routed in KiCad&#10;Firmware written in C++ with deep sleep mode"
                      value={formDeliverables}
                      onChange={(e) => setFormDeliverables(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e5ff] resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono-tech text-gray-300">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ESP32, KiCad, C++, I2C"
                      value={formTechStack}
                      onChange={(e) => setFormTechStack(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono-tech text-gray-300">
                      Status Badge
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Completed, Live Demo, Prototype"
                      value={formLiveStatus}
                      onChange={(e) => setFormLiveStatus(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-premium btn-cyan py-2 px-5 text-xs font-orbitron flex items-center gap-1.5"
                  >
                    <Save size={13} />
                    <span>Save Project</span>
                  </button>
                </div>
              </form>
            )}

            {/* PROJECTS LIST */}
            {projectsList.length === 0 ? (
              <div className="rounded-xl p-8 bg-white/[0.02] border border-dashed border-white/15 text-center space-y-3">
                <Layers className="mx-auto text-gray-500" size={32} />
                <h4 className="text-sm font-orbitron font-medium text-white">
                  No Projects Listed Yet
                </h4>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  {isOwner
                    ? 'Click the Add Project button above to publish your first project for this skill!'
                    : 'Artifacts and live project showcases for this skill are currently in progress.'}
                </p>
                {isOwner && (
                  <button
                    onClick={handleStartAdd}
                    className="btn-premium btn-cyan py-2 px-4 text-xs font-orbitron inline-flex items-center gap-1"
                  >
                    <Plus size={13} />
                    <span>Add First Project</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {projectsList.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-xl p-5 bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all space-y-3 group/card"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base sm:text-lg font-orbitron font-bold text-white tracking-wide">
                          {proj.title}
                        </h4>
                        {proj.subtitle && (
                          <p className="text-xs text-[#00e5ff] font-mono-tech mt-0.5">
                            {proj.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Right Action Icons: Live Link + (Edit & Delete for Owner Only) */}
                      <div className="flex items-center gap-2">
                        {proj.liveStatus && (
                          <span className="text-[10px] font-mono-tech px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {proj.liveStatus}
                          </span>
                        )}

                        {proj.linkUrl && (
                          <a
                            href={proj.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#00e5ff]/15 hover:bg-[#00e5ff]/25 text-[#00e5ff] border border-[#00e5ff]/30 text-xs font-orbitron transition-all"
                          >
                            <span>{proj.linkLabel || 'Open Work'}</span>
                            <ExternalLink size={12} />
                          </a>
                        )}

                        {/* In-app Edit & Delete Buttons - VISIBLE ONLY TO OWNER */}
                        {isOwner && (
                          <>
                            <button
                              onClick={() => handleStartEdit(proj)}
                              title="Edit this project"
                              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#00e5ff] transition-colors"
                            >
                              <Edit2 size={12} />
                            </button>

                            {confirmDeleteId === proj.id ? (
                              <div className="flex items-center gap-1.5 bg-red-950/90 border border-red-500/60 rounded-lg px-2 py-1 shadow-lg">
                                <span className="text-[10px] font-mono-tech text-red-300 font-semibold">Delete?</span>
                                <button
                                  type="button"
                                  onClick={() => handleConfirmDelete(proj.id)}
                                  className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white text-[10px] font-orbitron font-bold transition-colors shadow-sm"
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-gray-300 text-[10px] font-mono-tech transition-colors"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(proj.id)}
                                title="Delete this project"
                                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Deliverables */}
                    {proj.deliverables && proj.deliverables.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-mono-tech uppercase text-gray-400 tracking-wider">
                          Key Highlights & Deliverables:
                        </span>
                        <ul className="space-y-1">
                          {proj.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                              <CheckCircle2 size={13} className="text-[#00e5ff] mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech stack pills */}
                    {proj.techStack && proj.techStack.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {proj.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-gray-400 font-mono-tech"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className="btn-premium btn-purple py-2 px-4 text-xs font-orbitron flex items-center gap-2"
                >
                  <ArrowLeft size={13} />
                  <span>Return to Overview</span>
                </button>
                {isOwner && (
                  showResetConfirm ? (
                    <div className="flex items-center gap-1.5 bg-yellow-950/90 border border-yellow-500/60 rounded-lg px-2 py-1 shadow-lg">
                      <span className="text-[10px] font-mono-tech text-yellow-300 font-semibold">Reset all?</span>
                      <button
                        type="button"
                        onClick={handleConfirmReset}
                        className="px-2 py-0.5 rounded bg-yellow-600 hover:bg-yellow-500 text-white text-[10px] font-orbitron font-bold transition-colors"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(false)}
                        className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-gray-300 text-[10px] font-mono-tech transition-colors"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(true)}
                      className="text-[11px] font-mono-tech text-gray-500 hover:text-gray-300 flex items-center gap-1 px-2 py-1"
                      title="Reset to original template projects"
                    >
                      <RotateCcw size={11} />
                      <span>Reset Defaults</span>
                    </button>
                  )
                )}
              </div>

              <div className="flex items-center gap-3">
                {isOwner && (
                  <span className="text-[10px] font-mono-tech text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Verified Owner
                  </span>
                )}

                <button
                  onClick={onClose}
                  className="text-xs text-gray-400 hover:text-white px-3 py-2"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

        {/* OWNER PIN AUTHENTICATION MODAL */}
        {showPinModal && (
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md rounded-2xl z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowPinModal(false);
            }}
          >
            <div className="w-full max-w-sm p-6 rounded-xl bg-[#0e0e20] border border-[#00e5ff]/40 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff] flex items-center justify-center border border-[#00e5ff]/30">
                    <KeyRound size={16} />
                  </div>
                  <div>
                    <h5 className="text-sm font-orbitron font-bold text-white">Owner Access</h5>
                    <p className="text-[10px] text-gray-400 font-mono-tech">Enter secret PIN to unlock editing</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPinModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleVerifyPin} className="space-y-3">
                <div>
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter Secret PIN"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError('');
                    }}
                    className="w-full bg-black/60 border border-white/20 focus:border-[#00e5ff] rounded-lg px-3 py-2.5 text-center text-base tracking-widest text-white focus:outline-none font-mono-tech"
                  />
                  {pinError && (
                    <p className="text-[11px] text-red-400 font-mono-tech mt-1.5 text-center">
                      {pinError}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono-tech text-gray-500 pt-1">
                  <span>SHA-256 Protected</span>
                  <span>Read-Only by default</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPinModal(false)}
                    className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="btn-premium btn-cyan py-1.5 px-4 text-xs font-orbitron disabled:opacity-50"
                  >
                    {isVerifying ? 'Verifying...' : 'Unlock'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CHANGE OWNER PIN MODAL */}
        {showChangePin && (
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md rounded-2xl z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowChangePin(false);
            }}
          >
            <div className="w-full max-w-sm p-6 rounded-xl bg-[#0e0e20] border border-[#00e5ff]/40 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff] flex items-center justify-center border border-[#00e5ff]/30">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h5 className="text-sm font-orbitron font-bold text-white">Update PIN</h5>
                    <p className="text-[10px] text-gray-400 font-mono-tech">Set your new custom secret PIN</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChangePin(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleUpdatePin} className="space-y-3">
                <div>
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter new PIN / password (min 4 chars)"
                    value={newPinInput}
                    onChange={(e) => {
                      setNewPinInput(e.target.value);
                      setPinError('');
                    }}
                    className="w-full bg-black/60 border border-white/20 focus:border-[#00e5ff] rounded-lg px-3 py-2.5 text-center text-sm text-white focus:outline-none font-mono-tech"
                  />
                  {pinError && (
                    <p className="text-[11px] text-red-400 font-mono-tech mt-1.5 text-center">
                      {pinError}
                    </p>
                  )}
                  {pinSuccessMsg && (
                    <p className="text-[11px] text-emerald-400 font-mono-tech mt-1.5 text-center">
                      {pinSuccessMsg}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowChangePin(false)}
                    className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-premium btn-cyan py-1.5 px-4 text-xs font-orbitron"
                  >
                    Save New PIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
