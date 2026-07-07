import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedState {
  savedFoodIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      savedFoodIds: [],
      toggleSave: (id: string) => set((state) => {
        const isCurrentlySaved = state.savedFoodIds.includes(id);
        return {
          savedFoodIds: isCurrentlySaved
            ? state.savedFoodIds.filter(savedId => savedId !== id)
            : [...state.savedFoodIds, id]
        };
      }),
      isSaved: (id: string) => get().savedFoodIds.includes(id),
    }),
    {
      name: 'vitality-saved-foods',
    }
  )
);
