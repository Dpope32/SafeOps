// __tests__/DetailsScreen.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DetailsScreen from '../app/details';
import { useRouter } from 'expo-router';
import useStore from '../store/useStore';

jest.mock('../store/useStore');
jest.mock('expo-router', () => {
  const back = jest.fn();
  return {
    useRouter: () => ({
      back,
    }),
    __back: back, // Expose the mock for testing
  };
});

describe('DetailsScreen', () => {
  it('renders correctly and handles favorite toggle', () => {
    const toggleFavorite = jest.fn();
    useStore.mockReturnValueOnce([{ code: '1234', title: 'Test Title' }]); // favorites
    useStore.mockReturnValueOnce(toggleFavorite);

    const route = { params: { data: { code: '1234', title: 'Test Title', description: 'Test Description', details: 'Test Details' } } };

    const { getByText, getByLabelText } = render(<DetailsScreen route={route} />);

    const backButton = getByText('Back');
    fireEvent.press(backButton);

    expect(require('expo-router').__back).toHaveBeenCalled(); // Use the exposed mock

    const favoriteButton = getByLabelText('toggle favorite');
    fireEvent.press(favoriteButton);

    expect(toggleFavorite).toHaveBeenCalledWith({
      code: '1234',
      title: 'Test Title',
      description: 'Test Description',
      details: 'Test Details',
    });
  });
});
