import React from 'react';
import { create } from 'zustand';

interface MessageState {
  visible: boolean;
  message: string;
}

interface PopupDelete {
  title: string;
  subtitle: React.ReactNode;
  visible: boolean;
  setVisible: any;
  onConfirm: any;
}

interface UIState {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;

  successMessage: MessageState;
  setSuccessMessage: (value: MessageState) => void;

  errorMessage: MessageState;
  setErrorMessage: (value: MessageState) => void;

  popUpDelete: PopupDelete;
  setPopUpDelete: (value: PopupDelete) => void;
}

export const useUIStore = create<UIState>((set) => ({
  darkMode: false,
  setDarkMode: (value) => set({ darkMode: value }),

  successMessage: {
    visible: false,
    message: '',
  },
  
  setSuccessMessage: (value) => set({ successMessage: value }),

  errorMessage: {
    visible: false,
    message: '',
  },
  setErrorMessage: (value) => set({ errorMessage: value }),

  popUpDelete: {
    title: '',
    subtitle: '',
    visible: false,
    onConfirm: async () => {},
    setVisible: () => {},
  },
  setPopUpDelete: (value) => set({ popUpDelete: value }),
}));
