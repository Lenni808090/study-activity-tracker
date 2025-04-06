
import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('study-theme') || 'dark',
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem('study-theme', theme);
  }
}));