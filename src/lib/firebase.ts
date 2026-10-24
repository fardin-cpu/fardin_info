import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { WorkItem } from '../types';

// Initialize Firebase safely (prevent multiple instances during hot-reloads)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore using the configured database ID
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

/**
 * Real-time listener for works of a specific skill.
 * Returns an unsubscribe function.
 */
export function subscribeToSkillWorks(
  skillId: string,
  onUpdate: (works: WorkItem[] | null) => void
): () => void {
  try {
    const docRef = doc(db, 'custom_works', skillId);
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data && Array.isArray(data.works)) {
            onUpdate(data.works);
            return;
          }
        }
        onUpdate(null);
      },
      (error) => {
        console.warn(`[Firebase] Firestore subscription error for ${skillId}:`, error);
        onUpdate(null);
      }
    );
  } catch (err) {
    console.error('[Firebase] Failed to setup works listener:', err);
    onUpdate(null);
    return () => {};
  }
}

/**
 * Fetch works for a specific skill once (fallback/initial fetch)
 */
export async function fetchSkillWorksCloud(skillId: string): Promise<WorkItem[] | null> {
  try {
    const docRef = doc(db, 'custom_works', skillId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data && Array.isArray(data.works)) {
        return data.works as WorkItem[];
      }
    }
  } catch (err) {
    console.warn(`[Firebase] Could not fetch works for ${skillId} from cloud:`, err);
  }
  return null;
}

/**
 * Save / Update works for a specific skill to Cloud Firestore
 */
export async function saveSkillWorksToCloud(
  skillId: string,
  works: WorkItem[]
): Promise<boolean> {
  try {
    const docRef = doc(db, 'custom_works', skillId);
    await setDoc(docRef, {
      skillId,
      works,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.error(`[Firebase] Error saving works to cloud for ${skillId}:`, err);
    throw err;
  }
}

/**
 * Real-time listener for site custom avatar
 */
export function subscribeToSiteAvatar(
  onUpdate: (avatarUrl: string | null) => void
): () => void {
  try {
    const docRef = doc(db, 'site_settings', 'profile');
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data && typeof data.customAvatar === 'string') {
            onUpdate(data.customAvatar);
            return;
          }
        }
        onUpdate(null);
      },
      (error) => {
        console.warn('[Firebase] Firestore avatar subscription error:', error);
        onUpdate(null);
      }
    );
  } catch (err) {
    console.error('[Firebase] Failed to setup avatar listener:', err);
    onUpdate(null);
    return () => {};
  }
}

/**
 * Save site avatar to Cloud Firestore
 */
export async function saveSiteAvatarToCloud(avatarDataUrl: string): Promise<boolean> {
  try {
    const docRef = doc(db, 'site_settings', 'profile');
    await setDoc(docRef, {
      customAvatar: avatarDataUrl,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.error('[Firebase] Error saving avatar to cloud:', err);
    throw err;
  }
}

/**
 * Reset site avatar from Cloud Firestore
 */
export async function resetSiteAvatarFromCloud(): Promise<boolean> {
  try {
    const docRef = doc(db, 'site_settings', 'profile');
    await setDoc(docRef, {
      customAvatar: '',
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.error('[Firebase] Error resetting avatar in cloud:', err);
    throw err;
  }
}

/**
 * Submit feedback / comment to Cloud Firestore
 */
export async function submitFeedbackToCloud(feedback: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  try {
    const colRef = collection(db, 'feedback_messages');
    await addDoc(colRef, {
      ...feedback,
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.error('[Firebase] Error recording feedback in cloud:', err);
    return false;
  }
}
