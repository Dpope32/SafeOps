import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'transparent',
    flexGrow: 1,
    marginTop: 20,
  },
  gradient: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    color: '#fff',
  },
  noFavorites: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#fff',
  },
  listItemTitle: {
    color: '#fff',
  },
  listItemDescription: {
    color: '#fff',
  },
  // Additional styles for better input experience
  inputContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default styles;
