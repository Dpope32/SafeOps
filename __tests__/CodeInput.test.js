// __tests__/CodeInput.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CodeInput from '../components/CodeInput';

describe('CodeInput', () => {
  it('renders correctly and handles input', () => {
    const setCode = jest.fn();
    const { getByLabelText } = render(<CodeInput code="" setCode={setCode} />);

    const input = getByLabelText('code-input');
    fireEvent.changeText(input, '12a4');

    expect(setCode).toHaveBeenCalledWith('124');
  });

  it('clears input when clear icon is pressed', () => {
    const setCode = jest.fn();
    const { getByLabelText } = render(<CodeInput code="1234" setCode={setCode} />);

    const clearButton = getByLabelText('clear input');
    fireEvent.press(clearButton);

    expect(setCode).toHaveBeenCalledWith('');
  });
});
