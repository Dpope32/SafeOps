// useStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CodeData {
  code: string;
  title: string;
  description: string;
  details: string;
}

export interface StoreState {
  searchHistory: CodeData[];
  favorites: CodeData[];
  username: string | null;
  theme: 'light' | 'dark';
  addToSearchHistory: (codeData: CodeData) => void;
  toggleFavorite: (codeData: CodeData) => void;
  setUsername: (name: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      searchHistory: [],
      favorites: [],
      username: null,
      theme: 'light',
      addToSearchHistory: (codeData: CodeData) => {
        const updatedHistory = [
          codeData,
          ...get().searchHistory.filter(item => item.code !== codeData.code)
        ].slice(0, 10);
        set({ searchHistory: updatedHistory });
      },
      toggleFavorite: (codeData) => {
        const isFavorited = get().favorites.some(item => item.code === codeData.code);
        if (isFavorited) {
          set({ favorites: get().favorites.filter(item => item.code !== codeData.code) });
        } else {
          set({ favorites: [codeData, ...get().favorites] });
        }
      },
      setUsername: (name) => set({ username: name }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'clark-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);

export default useStore;
