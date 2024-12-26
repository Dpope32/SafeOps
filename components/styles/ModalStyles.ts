import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1A1D1E',
    borderRadius: SCREEN_HEIGHT * 0.02,
    padding: SCREEN_HEIGHT * 0.04,
    width: '85%',
    borderWidth: SCREEN_HEIGHT * 0.001875,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  title: {
    fontSize: SCREEN_HEIGHT * 0.035,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: SCREEN_HEIGHT * 0.04,
    letterSpacing: 0.5,
  },
  label: {
    fontSize: SCREEN_HEIGHT * 0.02,
    color: '#FFFFFF',
    marginBottom: SCREEN_HEIGHT * 0.01,
    fontWeight: '500',
  },
  input: {
    marginBottom: SCREEN_HEIGHT * 0.03,
    height: SCREEN_HEIGHT * 0.06,
    fontSize: SCREEN_HEIGHT * 0.02,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  listItem: {
    paddingVertical: SCREEN_HEIGHT * 0.01,
    marginBottom: SCREEN_HEIGHT * 0.04,
  },
  listItemText: {
    color: '#FFFFFF',
    fontSize: SCREEN_HEIGHT * 0.02,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: SCREEN_HEIGHT * 0.035,
  },
  button: {
    width: '100%',
    backgroundColor: 'rgba(56, 189, 248, 0.25)',
    borderRadius: SCREEN_HEIGHT * 0.01,
    borderWidth: SCREEN_HEIGHT * 0.001875,
    borderColor: 'rgba(59, 130, 246, 0.8)',
    overflow: 'hidden',
  },
  buttonContent: {
    paddingVertical: SCREEN_HEIGHT * 0.0045,
    paddingHorizontal: SCREEN_HEIGHT * 0.025,
  },
  buttonLabel: {
    fontSize: SCREEN_HEIGHT * 0.01875,
    fontWeight: '600',
    color: '#60A5FA',
    letterSpacing: 0.3,
  },
});

export const inputTheme = {
  colors: {
    onSurfaceVariant: 'rgba(255, 255, 255, 0.5)',
    primary: 'rgba(59, 130, 246, 0.8)',
    text: '#FFFFFF',
    placeholder: 'rgba(255, 255, 255, 0.5)',
    background: 'transparent'
  }
};
