import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

interface AuthState {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  setAuth: (accessToken: string, refreshToken: string | null) => void;
  logout: () => void;
  loadTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  accessToken: undefined,
  refreshToken: undefined,
  setAuth: (accessToken, refreshToken) =>
    set({
      accessToken: accessToken || undefined,
      refreshToken: refreshToken || undefined,
    }),
  logout: () => set({accessToken: undefined, refreshToken: undefined}),
  loadTokens: async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    set({
      accessToken: accessToken || undefined,
      refreshToken: refreshToken || undefined,
    });
  },
}));
