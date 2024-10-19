// jest.setup.js
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock 'expo-router'
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

// Mock 'expo-haptics'
jest.mock('expo-haptics', () => ({
  vibrate: jest.fn(),
  notificationAsync: jest.fn(),
}));

// Mock 'expo-modules-core'
jest.mock('expo-modules-core', () => ({
  DeviceEventEmitter: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  },
}));
