import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, List, IconButton } from 'react-native-paper';
import useStore from '../../store/useStore';
import { useRouter } from 'expo-router';
import SimpleHeader from '../../components/SimpleHeader';
import styles from '../styles';
import { MaterialIcons } from '@expo/vector-icons';

const HistoryScreen = () => {
  const searchHistory = useStore((state) => state.searchHistory);
  const router = useRouter();

  const handlePress = (data) => {
    router.push({
      pathname: '/details',
      params: { data: JSON.stringify(data) }
    });
  };

  return (
    <View style={styles.container}>
      <SimpleHeader title="Search History" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {searchHistory.length === 0 ? (
          <Text style={styles.noFavorites}>No recent searches found.</Text>
        ) : (
          searchHistory.map((item) => (
            <TouchableOpacity key={item.code} onPress={() => handlePress(item)}>
              <List.Item
                title={item.title}
                description={`Code: ${item.code}`}
                left={props => (
                  <MaterialIcons 
                    name="history"  // or "star" for favorites
                    size={24} 
                    color="rgba(59, 130, 246, 0.8)"
                    style={{ marginLeft: 8 }}
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

export default HistoryScreen;