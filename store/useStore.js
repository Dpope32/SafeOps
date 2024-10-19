// store/useStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(
  persist(
    (set, get) => ({
      searchHistory: [],
      addToSearchHistory: (codeData) => {
        const updatedHistory = [codeData, ...get().searchHistory.filter(item => item.code !== codeData.code)];
        if (updatedHistory.length > 10) updatedHistory.pop(); // Keep last 10 searches
        set({ searchHistory: updatedHistory });
      },
      favorites: [],
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
      name: 'safeops-storage', // unique name
      storage: AsyncStorage, 
    }
  )
);

export default useStore;
