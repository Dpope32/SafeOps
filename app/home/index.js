import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CodeInput from '../../components/CodeInput';
import AnimatedButton from '../../components/AnimatedButton';
import SimpleHeader from '../../components/SimpleHeader';
import TimeGreeting from '../../components/TimeGreeting';
import { getCodeDetails, initializeDatabase, getAllCodes } from '../../database';
import useStore from '../../store/useStore';
import UsernameModal from '../../components/UsernameModal';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const HomeScreen = () => {
  const [code, setCode] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [dbInitialized, setDbInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const addToSearchHistory = useStore((state) => state.addToSearchHistory);
  const username = useStore(state => state.username);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      setLoading(true);
      await initializeDatabase();
      setDbInitialized(true);
      setLoading(false);
    };
    initDB();
  }, []);

  useEffect(() => {
    if (!username) {
      setShowModal(true);
    }
  }, [username]);

  const filterSuggestions = useCallback(async (text) => {
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
      .slice(0, 5);

    setSuggestions(filtered);
  }, []);

  const handleSuggestionPress = useCallback((item) => {
    addToSearchHistory(item);
    router.push(`/details?code=${encodeURIComponent(item.code)}`);
    setCode(item.code);
  }, [addToSearchHistory, router]);

  const handleLookup = useCallback(async () => {
    if (!dbInitialized) {
      Alert.alert('Loading', 'Database is still initializing. Please try again shortly.');
      return;
    }

    if (!suggestions.some(s => s.code.toLowerCase() === code.toLowerCase())) {
      if (code.length < 2 || code.length > 4) {
        Alert.alert('Invalid Code', 'Please enter a code between 2-4 characters.');
        return;
      }
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
  }, [addToSearchHistory, code, dbInitialized, router, suggestions]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
      >
        <View style={styles.container}>
          <SimpleHeader />
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentContainer}>
              <TimeGreeting />
              <View style={styles.mainCard}>
                <View style={styles.inputWrapper}>
                  <CodeInput
                    code={code}
                    setCode={(text) => {
                      setCode(text);
                      filterSuggestions(text);
                    }}
                    suggestions={suggestions}
                    onSuggestionPress={handleSuggestionPress}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <AnimatedButton
                    onPress={handleLookup}
                    title="Search"
                    variant="primary"
                  />
                </View>
              </View>

              <View style={styles.navigationContainer}>
                <AnimatedButton
                  onPress={() => router.push('/history')}
                  title="History"
                  variant="secondary"
                  style={styles.navButton}
                />
                <AnimatedButton
                  onPress={() => router.push('/favorites')}
                  title="Favorites"
                  variant="secondary"
                  style={styles.navButton}
                />
              </View>
            </View>
          </ScrollView>
          <UsernameModal visible={showModal} onDismiss={() => setShowModal(false)} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1D1E',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  mainCard: {
    backgroundColor: 'rgba(0, 0, 246, 0.025)',
    borderRadius: 32,
    paddingVertical: 48,
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.02 : SCREEN_HEIGHT * 0.01,
    borderWidth: 1,
    borderColor: 'rgba(120, 130, 255, 0.5)',
    minHeight: SCREEN_HEIGHT * 0.25,
  },
  inputWrapper: {
    marginVertical: 12,
    width: '87.5%',
    zIndex: 999,
  },
  buttonContainer: {
    marginVertical: 2,
    width: '50%',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.15 : SCREEN_HEIGHT * 0.2,
    width: '100%',
    paddingBottom: 16,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default HomeScreen;