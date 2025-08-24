import { create } from 'zustand';

import type { UserFormData } from '@/validation/formSchema';

export type InfoOutput = Omit<UserFormData, 'image'> & {
  form: 'controlled' | 'uncontrolled';
  image: string;
};

type InfoOutputActions = {
  setNewInfo: (data: InfoOutput) => void;
};

type InfoOutputState = {
  infoOutput: InfoOutput[];
  actions: InfoOutputActions;
};

export const useInfoOutputStore = create<InfoOutputState>((set) => ({
  infoOutput: [],
  actions: {
    setNewInfo: (data) =>
      set((state) => ({
        ...state,
        infoOutput: [data, ...state.infoOutput],
      })),
  },
}));

export const useInfoOutput = () => useInfoOutputStore((store) => store.infoOutput);
export const useInfoOutputActions = () => useInfoOutputStore((store) => store.actions);
