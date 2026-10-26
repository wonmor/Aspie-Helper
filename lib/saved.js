// Saved and personal scripts, plus the person's own help card. Stored only on
// this device.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export const useSaved = create()(
  persist(
    (set, get) => ({
      // [{ id, title, text, scenarioId?, createdAt }]
      scripts: [],
      // Free: the person's own help card text (safety, never Pro-only)
      customCard: '',

      addScript: (title, text, scenarioId) =>
        set({ scripts: [{ id: newId(), title, text, scenarioId: scenarioId || null, createdAt: Date.now() }, ...get().scripts] }),
      updateScript: (id, patch) =>
        set({ scripts: get().scripts.map((s) => (s.id === id ? { ...s, ...patch } : s)) }),
      removeScript: (id) => set({ scripts: get().scripts.filter((s) => s.id !== id) }),
      hasScript: (text) => get().scripts.some((s) => s.text === text),
      setCustomCard: (customCard) => set({ customCard }),
    }),
    { name: 'aspie-saved-v1', storage: createJSONStorage(() => AsyncStorage) }
  )
);
