// __tests__/AnimatedButton.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AnimatedButton from '../components/AnimatedButton';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  selectionAsync: jest.fn(),
}));

describe('AnimatedButton', () => {
  it('renders correctly and handles press', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <AnimatedButton onPress={onPress} title="Test Button" theme={{ colors: { primary: '#000', surface: '#fff' } }} />
    );

    const button = getByText('Test Button');
    fireEvent.press(button.parent); // Press the TouchableOpacity

    expect(onPress).toHaveBeenCalled();
  });
}); // Added missing closing brace
