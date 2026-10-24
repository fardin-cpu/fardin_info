import { WorkItem } from '../types';
import { SKILL_ITEMS } from '../data/skillsData';
import {
  saveSkillWorksToCloud,
  saveSiteAvatarToCloud,
  resetSiteAvatarFromCloud
} from '../lib/firebase';

const STORAGE_KEY = 'fardin_portfolio_custom_works_v1';
const OWNER_AUTH_KEY = 'fardin_portfolio_owner_auth';
const OWNER_PIN_HASH_KEY = 'fardin_portfolio_owner_pinhash';

// Salted SHA-256 hash of default PIN "2009"
// Salt: "_fardin_secure_salt"
const DEFAULT_SALTED_HASH = '30140c4f5017be9860f5aa692de6f05d0f006003acd8b8f4e4cc1109e6143c73';

async function computeHash(pin: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(pin.trim() + '_fardin_secure_salt');
  const buffer = await crypto.subtle.digest('SHA-256', data);
  const hashArr = Array.from(new Uint8Array(buffer));
  return hashArr.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function isOwnerAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(OWNER_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export async function authenticateOwner(inputPin: string): Promise<boolean> {
  try {
    const inputHash = await computeHash(inputPin);
    const targetHash = localStorage.getItem(OWNER_PIN_HASH_KEY) || DEFAULT_SALTED_HASH;
    if (inputHash === targetHash) {
      sessionStorage.setItem(OWNER_AUTH_KEY, 'true');
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function logoutOwner(): void {
  try {
    sessionStorage.removeItem(OWNER_AUTH_KEY);
  } catch (e) {
    console.error(e);
  }
}

export async function setCustomOwnerPin(newPin: string): Promise<boolean> {
  try {
    if (newPin && newPin.trim().length >= 4) {
      const newHash = await computeHash(newPin);
      localStorage.setItem(OWNER_PIN_HASH_KEY, newHash);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

const AVATAR_KEY = 'fardin_portfolio_avatar_custom';

export function getCustomAvatar(): string | null {
  try {
    return localStorage.getItem(AVATAR_KEY);
  } catch {
    return null;
  }
}

export function setCustomAvatar(dataUrl: string): void {
  try {
    localStorage.setItem(AVATAR_KEY, dataUrl);
    // Background sync to Cloud Firestore
    saveSiteAvatarToCloud(dataUrl).catch((err) => {
      console.warn('Cloud avatar sync warning:', err);
    });
  } catch (e) {
    console.error('Failed to save avatar:', e);
  }
}

export function resetCustomAvatar(): void {
  try {
    localStorage.removeItem(AVATAR_KEY);
    // Background reset in Cloud Firestore
    resetSiteAvatarFromCloud().catch((err) => {
      console.warn('Cloud avatar reset warning:', err);
    });
  } catch (e) {
    console.error(e);
  }
}


export interface CustomWorksState {
  [skillId: string]: WorkItem[];
}

// Save works locally only (useful when syncing from cloud to avoid loop)
export function saveWorksLocallyOnly(skillId: string, works: WorkItem[]): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const existing: CustomWorksState = saved ? JSON.parse(saved) : {};
    existing[skillId] = works;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Error saving custom works locally:', err);
  }
}

// Load works from localStorage or fallback to defaults
export function getWorksForSkill(skillId: string): WorkItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: CustomWorksState = JSON.parse(saved);
      if (parsed[skillId] && Array.isArray(parsed[skillId])) {
        return parsed[skillId];
      }
    }
  } catch (err) {
    console.error('Error loading custom works from storage:', err);
  }

  // Fallback to default bundled projects
  const skill = SKILL_ITEMS.find((s) => s.id === skillId);
  return skill ? [...skill.workProjects] : [];
}

// Save works for a specific skill (updates Local Storage + Cloud Firestore)
export function saveWorksForSkill(skillId: string, works: WorkItem[]): void {
  try {
    // 1. Instant local persistence
    saveWorksLocallyOnly(skillId, works);

    // 2. Real-time Cloud persistence
    saveSkillWorksToCloud(skillId, works).catch((err) => {
      console.warn(`[Storage] Cloud sync warning for skill ${skillId}:`, err);
    });
  } catch (err) {
    console.error('Error saving custom works to storage:', err);
  }
}

// Add or update a single work item
export function upsertWorkItem(skillId: string, work: WorkItem): WorkItem[] {
  const current = getWorksForSkill(skillId);
  const existingIndex = current.findIndex((w) => w.id === work.id);

  let updated: WorkItem[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = work;
  } else {
    updated = [work, ...current];
  }

  saveWorksForSkill(skillId, updated);
  return updated;
}

// Delete a work item
export function deleteWorkItem(skillId: string, workId: string): WorkItem[] {
  const current = getWorksForSkill(skillId);
  const updated = current.filter((w) => w.id !== workId);
  saveWorksForSkill(skillId, updated);
  return updated;
}

// Reset works for a skill to defaults
export function resetWorksForSkill(skillId: string): WorkItem[] {
  const skill = SKILL_ITEMS.find((s) => s.id === skillId);
  const defaultWorks = skill ? [...skill.workProjects] : [];
  saveWorksForSkill(skillId, defaultWorks);
  return defaultWorks;
}
