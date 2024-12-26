// app/screens/history/index.js
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Title, List } from 'react-native-paper';
import useStore from '../../store/useStore';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const HistoryScreen = () => {
  const searchHistory = useStore((state) => state.searchHistory);
  const router = useRouter();

  const handlePress = (data) => {
    router.push({ pathname: '/details', params: { data } });
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
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: 'transparent',
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  noHistory: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#f0f0f0',
  },
});

export default HistoryScreen;
