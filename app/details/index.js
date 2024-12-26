import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Text, useTheme, IconButton } from 'react-native-paper';
import SimpleHeader from '../../components/SimpleHeader';
import useStore from '../../store/useStore';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { getCodeDetails } from '../../database';
import AnimatedButton from '../../components/AnimatedButton';

const DetailsScreen = () => {
  const params = useGlobalSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  useEffect(() => {
    console.log('DetailsScreen params:', params);
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
      <View style={styles.container}>
        <SimpleHeader title="Details" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="rgba(59, 130, 246, 0.8)" />
        </View>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <SimpleHeader title="Details" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No data available.</Text>
          <AnimatedButton onPress={() => router.back()} title="Back" variant="secondary" />
        </View>
      </View>
    );
  }

  const isFavorited = favorites.some((item) => item.code === data.code);

  const handleToggleFavorite = () => {
    toggleFavorite(data);
  };

  return (
    <View style={styles.container}>
      <SimpleHeader title="Details" />
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentCard}>
          <View style={styles.cardHeader}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.subtitle}>Code: {data.code}</Text>
            </View>
            
            <IconButton
              icon={isFavorited ? 'star' : 'star-outline'}
              iconColor={isFavorited ? '#60A5FA' : 'rgba(255, 255, 255, 0.5)'}
              size={24}
              onPress={handleToggleFavorite}
              style={styles.favoriteButton}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsContainer}>
            <Text style={styles.description}>{data.description}</Text>
            <Text style={styles.details}>{data.details}</Text>
          </View>

          <View style={styles.actionContainer}>
            <AnimatedButton 
              onPress={() => router.back()} 
              title="Back" 
              variant="secondary"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1D1E',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    marginBottom: 20,
  },
  contentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  favoriteButton: {
    margin: 0,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 24,
  },
  details: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 22,
  },
  actionContainer: {
    marginTop: 8,
  },
});

export default DetailsScreen;
