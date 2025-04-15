import { create } from "zustand";

const useItineraryStore = create((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearItinerary: () =>
    set(() => ({
      items: [],
    })),
}));

export default useItineraryStore;
 
