import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CodeData {
  code: string;
  title: string;
  description: string;
  details: string;
}

interface StoreState {
  searchHistory: CodeData[];
  favorites: CodeData[];
  addToSearchHistory: (codeData: CodeData) => void;
  toggleFavorite: (codeData: CodeData) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      searchHistory: [],
      favorites: [],
      addToSearchHistory: (codeData) => {
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
    }),
    {
      name: 'safeops-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);

export default useStore;