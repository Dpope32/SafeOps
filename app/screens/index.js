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
import SimpleHeader from './SimpleHeader';
import { getCodeDetails, initializeDatabase, getAllCodes } from '../../database';
import useStore from '../../store/useStore';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; 

const HomeScreen = () => {
  const [code, setCode] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [dbInitialized, setDbInitialized] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const addToSearchHistory = useStore((state) => state.addToSearchHistory);

  useEffect(() => {
    const initDB = async () => {
      console.log('Initializing database...');
      await initializeDatabase();
      setDbInitialized(true);
      console.log('Database initialization complete.');
    };
    initDB();
  }, []);

  const handleLookup = async () => {
    if (!dbInitialized) {
      Alert.alert('Loading', 'Database is still initializing. Please try again shortly.');
      return;
    }
    console.log('Handle Lookup pressed with code:', code);
    if (code.length < 2 || code.length > 4) {
      Alert.alert('Invalid Code', 'Please enter a code between 2-4 characters.');
      return;
    }
  
    try {
      const result = await getCodeDetails(code);
      if (result) {
        addToSearchHistory(result);
        router.push(`/details?code=${encodeURIComponent(result.code)}`);
      } else {
        Alert.alert('Error', 'Code not found');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  
  const filterSuggestions = async (text) => {
    if (text.length < 1) {
      setSuggestions([]);
      return;
    }
    
    const allCodes = await getAllCodes();
    const filtered = allCodes
      .filter(item => 
        item.code.toLowerCase().includes(text.toLowerCase()) ||
        item.description.toLowerCase().includes(text.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 suggestions
    
    setSuggestions(filtered);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <SimpleHeader />
          <View style={styles.contentBox}>
            <CodeInput 
              code={code} 
              setCode={(text) => {
                setCode(text);
                filterSuggestions(text);
              }}
              suggestions={suggestions}
              onSuggestionPress={(item) => {
                setCode(item.code);
                handleLookup();
              }}
            />
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
          </View>
          <View style={styles.footer} />
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
    // Removed the transparent background
    // backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  contentBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    // Shadows for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
