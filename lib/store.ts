import { create } from "zustand"

interface AppState {
  // Example state for global settings or user preferences
  isDarkMode: boolean
  toggleDarkMode: () => void
  // Add other global states here
}

export const useAppStore = create<AppState>((set) => ({
  isDarkMode: false, // Default to light mode
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}))
