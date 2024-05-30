// TokenService.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types
export type AccessToken = string;

// Function to save token to AsyncStorage
export const saveTokenToStorage = async (token: AccessToken) => {
  try {
    await AsyncStorage.setItem('accessToken', token);
    console.log('Token saved successfully!');
  } catch (error) {
    console.error('Error saving token:', error.message);
  }
};

// Function to retrieve token from AsyncStorage
export const getTokenFromStorage = async (): Promise<AccessToken | null> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token ? token : null;
  } catch (error) {
    console.error('Error retrieving token:', error.message);
    return null;
  }
};
// TokenService.tsx
let globalToken: string | null = null;

export const saveTokenToGlobal = (token: string) => {
  globalToken = token;
};

export const getTokenFromGlobal = () => {
  return globalToken;
};
let token: string | null = null;

export const saveToken = (newToken: string) => {
  token = newToken;
};

export const getToken = () => {
  return token;
};
let userId: string = ''; // Biến toàn cục lưu trữ userId

export const saveUserIdToGlobal = (id: string) => {
  userId = id;
};

export const getUserIdFromGlobal = (): string => {
  return userId;
};
