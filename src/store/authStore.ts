import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name?: string | null;
  role: string;
  activeQuestionBankId?: string | null;
  createdAt?: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  hydrated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setHydrated: (v: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hydrated: false,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setHydrated: (v) => set({ hydrated: v }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'aws-cert-auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Don't persist hydrated flag
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
