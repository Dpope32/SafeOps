import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, List, IconButton } from 'react-native-paper';
import useStore from '../../store/useStore';
import { useRouter } from 'expo-router';
import SimpleHeader from '../../components/SimpleHeader';
import styles from '../styles';

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
    <View style={styles.container}>
      <SimpleHeader title="Favorites" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {favorites.length === 0 ? (
          <Text style={styles.noFavorites}>No favorites added yet.</Text>
        ) : (
          favorites.map((item) => (
            <TouchableOpacity key={item.code} onPress={() => handlePress(item)}>
              <List.Item
                title={item.title}
                description={`Code: ${item.code}`}
                left={props => (
                  <IconButton
                    icon="star"
                    size={24}
                    iconColor="rgba(59, 130, 246, 0.8)"
                  />
                )}
                style={styles.listItemContainer}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;