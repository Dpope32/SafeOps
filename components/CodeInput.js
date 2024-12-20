import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { TextInput, Surface, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

const CodeInput = ({ code, setCode, suggestions = [], onSuggestionPress }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text) => {
    const cleanedText = text.toUpperCase().replace(/[^A-Z0-9/]/g, '');
    if (cleanedText.length <= 4) {
      setCode(cleanedText);
      Haptics.selectionAsync();
    }
  };

  const renderSuggestions = () => {
    if (!isFocused || !suggestions.length) return null;

    return (
      <Surface style={styles.suggestionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => {
                onSuggestionPress(suggestion);
                Haptics.selectionAsync();
              }}
            >
              <Text style={styles.suggestionText}>{suggestion.code}</Text>
              <Text style={styles.suggestionSubtext}>{suggestion.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Surface>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={code}
        onChangeText={handleChangeText}
        style={styles.input}
        autoCapitalize="characters"
        placeholder="Enter Code"
        placeholderTextColor="#999"
        maxLength={4}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        autoCorrect={false}
        mode="outlined"
        outlineColor="#00008B" 
        activeOutlineColor="#00008B"
        theme={{
          roundness: 12,
          colors: {
            primary: 'transparent',
            background: 'transparent'
          }
        }}
        contentStyle={styles.inputContent}
      />
      {renderSuggestions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  input: {
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 70,
    padding: 10,
    color: '#fff',
  },
  inputContent: {
    fontWeight: '600',
    color: '#fff',
  },
  suggestionsContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  suggestionItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  suggestionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  suggestionSubtext: {
    color: '#ccc',
    fontSize: 12,
  },
});

export default React.memo(CodeInput);
