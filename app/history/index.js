// app/screens/history/index.js
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Title, List } from 'react-native-paper';
import useStore from '../../store/useStore';
import { useRouter } from 'expo-router';

const HistoryScreen = () => {
  const searchHistory = useStore((state) => state.searchHistory);
  const router = useRouter();

  const handlePress = (data) => {
    router.push({ pathname: '/details', params: { data } });
  };

  return (
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
  noHistory: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#555',
  },
});

export default HistoryScreen;
