import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Text, Card, Button, useTheme, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient'; // Importing LinearGradient
import useStore from '../../store/useStore';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { getCodeDetails } from '../../database';

const DetailsScreen = () => {
  const params = useGlobalSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const router = useRouter();
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.data) {
          setData(JSON.parse(params.data));
          setLoading(false);
        } else if (params.code) {
          const fetchedData = await getCodeDetails(params.code);
          if (fetchedData) {
            setData(fetchedData);
          } else {
            Alert.alert('Error', 'Code not found');
          }
          setLoading(false);
        } else {
          Alert.alert('Error', 'No code provided.');
          setLoading(false);
        }
      } catch (error) {
        Alert.alert('Error', error.message || 'An unexpected error occurred.');
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </ScrollView>
    );
  }

  if (!data) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ color: theme.colors.text }}>No data available.</Text>
        <Button onPress={() => router.back()} color={theme.colors.primary}>
          Back
        </Button>
      </ScrollView>
    );
  }

  const isFavorited = favorites.some((item) => item.code === data.code);

  const handleToggleFavorite = () => {
    toggleFavorite(data);
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']} // Example gradient colors
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title={data.title}
            subtitle={`Code: ${data.code}`}
            right={(props) => (
              <IconButton
                {...props}
                icon={isFavorited ? 'star' : 'star-outline'}
                color={isFavorited ? '#f1c40f' : '#555'}
                onPress={handleToggleFavorite}
                accessibilityLabel="toggle favorite"
              />
            )}
          />
          <Card.Content>
            <Text style={[styles.description, { color: theme.colors.text }]}>{data.description}</Text>
            <Text style={[styles.details, { color: theme.colors.text }]}>{data.details}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => router.back()} color={theme.colors.primary}>
              Back
            </Button>
          </Card.Actions>
        </Card>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    width: '100%',
  },
  description: {
    marginBottom: 10,
    fontSize: 18,
  },
  details: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default DetailsScreen;
