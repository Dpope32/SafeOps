// app/screens/favorites/index.js
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Text, Title, List } from 'react-native-paper';
import useStore from '../../store/useStore';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; // Importing LinearGradient
import styles from '../styles'; // Importing styles from styles.ts

const FavoritesScreen = () => {
  const favorites = useStore((state) => state.favorites);
  const router = useRouter();

  const handlePress = (data) => {
    router.push({
      pathname: '/details',
      params: { data: JSON.stringify(data) }
    });
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']} // Applying the linear gradient
      style={styles.gradient}
    >
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
                titleStyle={styles.listItemTitle} // Adding title style
                descriptionStyle={styles.listItemDescription} // Adding description style
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default FavoritesScreen;
