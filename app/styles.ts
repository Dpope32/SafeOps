import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#1A1D1E',
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  noFavorites: {
    fontSize: 18,
    marginTop: 50,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
  listItemContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.00)',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    elevation: 6,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  listItemDescription: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 6,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.025)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginVertical: 12,
  },
  input: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  buttonText: {
    color: '#60A5FA',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default styles;
