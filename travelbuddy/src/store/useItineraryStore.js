import { create } from "zustand";

const useItineraryStore = create((set) => ({
  items: [],

  originCity: "LON", // default

  setOriginCity: (city) =>
  set(() => ({
    originCity: city,
  })),

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
 
