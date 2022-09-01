import create from "zustand";

interface Storage {
  triggered: boolean;
  triggerRender: () => void;
}

export const useStorageStore = create<Storage>()((set) => ({
  triggered: false,

  triggerRender: () =>
    set((state) => ({
      ...state,
      triggered: !state.triggered,
    })),
}));
