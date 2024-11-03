import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'transparent',
    flexGrow: 1,
    marginTop: 20, // Added margin to bring the screen down
  },
  gradient: {
    flex: 1, // Ensuring the gradient covers the full screen
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24, // Increased font size for title
    color: '#fff', // Changed color for better visibility
  },
  noFavorites: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#fff', // Changed color to white for better visibility
  },
  listItemTitle: {
    color: '#fff', // Ensuring title text is white
  },
  listItemDescription: {
    color: '#fff', // Ensuring description text is white
  },
});

export default styles;
