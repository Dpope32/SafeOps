// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Title, useTheme } from 'react-native-paper';
import CodeInput from '../../components/CodeInput';
import AnimatedButton from '../../components/AnimatedButton';
import { getCodeDetails, initializeDatabase } from '../../data/initializeDB';  // Ensure this import includes initializeDatabase
import useStore from '../../store/useStore';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; 

const HomeScreen = () => {
  const [code, setCode] = useState('');
  const theme = useTheme();
  const router = useRouter();
  const addToSearchHistory = useStore((state) => state.addToSearchHistory);

  // Ensure database is initialized when the component mounts
  useEffect(() => {
    initializeDatabase();
  }, []);

  const handleLookup = () => {
    if (code.length !== 4) {
      Alert.alert('Invalid Code', 'Please enter a 4-digit code.');
      return;
    }

    getCodeDetails(
      code,
      (data) => {
        addToSearchHistory(data);
        router.push(`/details?code=${data.code}`);
      },
      (error) => {
        Alert.alert('Error', error);
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']} // Reintroduced gradient
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Title style={styles.title}>SafeOps</Title>
          <CodeInput code={code} setCode={setCode} />
          <AnimatedButton onPress={handleLookup} title="Lookup" />
          <View style={styles.navigationButtons}>
            <AnimatedButton
              onPress={() => router.push('/history')}
              title="History"
            />
            <AnimatedButton
              onPress={() => router.push('/favorites')}
              title="Favorites"
            />
          </View>
          <View style={styles.footer}>
            {/* Add any footer content here if needed */}
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // Transparent to show gradient
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 18,
    color: '#f0f0f0',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default HomeScreen;
