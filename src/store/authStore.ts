import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (accessToken: string, refreshToken: string | null) => void;
  logout: () => void;
  loadTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  accessToken: null,
  refreshToken: null,
  setAuth: (accessToken, refreshToken) => set({accessToken, refreshToken}),
  logout: () => set({accessToken: null, refreshToken: null}),
  loadTokens: async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    set({
      accessToken: accessToken || null,
      refreshToken: refreshToken || null,
    });
  },
}));
