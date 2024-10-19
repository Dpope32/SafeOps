// app/screens/favorites/index.js
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Title, List } from 'react-native-paper';
import useStore from '../../store/useStore';
import { useRouter } from 'expo-router';

const FavoritesScreen = () => {
  const favorites = useStore((state) => state.favorites);
  const router = useRouter();

  const handlePress = (data) => {
    router.push({ pathname: '/details', params: { data } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Favorites</Title>
      {favorites.length === 0 ? (
        <Text style={styles.noFavorites}>No favorites added.</Text>
      ) : (
        favorites.map((item) => (
          <TouchableOpacity key={item.code} onPress={() => handlePress(item)}>
            <List.Item
              title={item.title}
              description={`Code: ${item.code}`}
              left={(props) => <List.Icon {...props} icon="star" />}
              accessibilityLabel={`favorite-item-${item.code}`}
            />
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'transparent',
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  noFavorites: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#555',
  },
});

export default FavoritesScreen;
