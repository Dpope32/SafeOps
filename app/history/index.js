// app/screens/history/index.js
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Text, Title, List } from 'react-native-paper';
import useStore from '../../store/useStore';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; // Importing LinearGradient
import styles from '../styles'; // Importing styles from favorites/styles.ts

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
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>Search History</Title>
        {searchHistory.length === 0 ? (
          <Text style={styles.noHistory}>No recent searches.</Text>
        ) : (
          searchHistory.map((item) => (
            <TouchableOpacity key={item.code} onPress={() => handlePress(item)}>
              <List.Item
                title={item.title}
                description={`Code: ${item.code}`}
                left={(props) => <List.Icon {...props} icon="history" />}
                accessibilityLabel={`history-item-${item.code}`}
                style={styles.listItem} // Adding style to list item
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

export default HistoryScreen;
