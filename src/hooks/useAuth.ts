// src/hooks/useAuth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {AuthState, User} from '../types/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    isLoading: true,
  });

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        AsyncStorage.getItem('accessToken'),
        AsyncStorage.getItem('refreshToken'),
      ]);

      setAuthState({
        accessToken: accessToken ? accessToken : null,
        refreshToken: refreshToken ? refreshToken : null,
        isLoading: false,
      });
    } catch (error) {
      console.error('인증 정보 로드 실패:', error);
      setAuthState(prev => ({...prev, isLoading: false}));
    }
  };

  const setLogin = async (
    userData: User,
    accessToken: string,
    refreshToken: string | null,
  ) => {
    try {
      if (!userData) {
        throw new Error('사용자 데이터가 없습니다.');
      }

      await Promise.all([
        AsyncStorage.setItem('accessToken', accessToken || ''),
        AsyncStorage.setItem('refreshToken', refreshToken || ''),
      ]);

      setAuthState({
        accessToken: accessToken || '',
        refreshToken: refreshToken || '',
        isLoading: false,
      });

      return true;
    } catch (error) {
      console.error('로그인 정보 저장 실패:', error);
      return false;
    }
  };

  const setLogout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('user'),
        AsyncStorage.removeItem('accessToken'),
        AsyncStorage.removeItem('refreshToken'),
      ]);

      setAuthState({
        accessToken: null,
        refreshToken: null,
        isLoading: false,
      });

      return true;
    } catch (error) {
      console.error('로그아웃 처리 실패:', error);
      return false;
    }
  };

  return {
    ...authState,
    setLogin,
    setLogout,
  };
};
