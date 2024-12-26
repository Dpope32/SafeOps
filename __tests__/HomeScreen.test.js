import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../app/screens';
import useStore from '../store/useStore';
import { getCodeDetails } from '../data/initializeDB';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

jest.mock('../store/useStore');
jest.mock('../data/initializeDB');
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('expo-haptics', () => ({
  selectionAsync: jest.fn(),
}));

describe('HomeScreen', () => {
  const addToSearchHistoryMock = jest.fn();
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useStore.mockImplementation((selector) => {
      return selector({
        addToSearchHistory: addToSearchHistoryMock,
      });
    });

    useRouter.mockReturnValue({
      push: pushMock,
    });
  });

  it('handles valid code lookup', async () => {
    getCodeDetails.mockImplementation((code, success, error) => {
      console.log(`getCodeDetails called with code: ${code}`); // Log the code being looked up
      success({ code: '1234', title: 'Test Title', description: 'Test Description', details: 'Test Details' });
    });

    const { getByLabelText, getByText } = render(<HomeScreen />);

    const input = getByLabelText('code-input');
    fireEvent.changeText(input, '1234');

    const lookupButton = getByText('Lookup');
    fireEvent.press(lookupButton.parent);

    await waitFor(() => {
      expect(getCodeDetails).toHaveBeenCalledWith('1234', expect.any(Function), expect.any(Function));
      expect(addToSearchHistoryMock).toHaveBeenCalledWith({
        code: '1234',
        title: 'Test Title',
        description: 'Test Description',
        details: 'Test Details',
      });
      expect(pushMock).toHaveBeenCalledWith({ pathname: '/details', params: { data: { code: '1234', title: 'Test Title', description: 'Test Description', details: 'Test Details' } } });
    });
  });

  it('alerts on invalid code length', () => {
    const alertMock = jest.spyOn(Alert, 'alert');

    const { getByLabelText, getByText } = render(<HomeScreen />);

    const input = getByLabelText('code-input');
    fireEvent.changeText(input, '12');

    const lookupButton = getByText('Lookup');
    fireEvent.press(lookupButton.parent);

    expect(alertMock).toHaveBeenCalledWith('Invalid Code', 'Please enter a 4-digit code.');
  });
});
