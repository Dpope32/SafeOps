// CodeInput.js

import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions, Platform } from 'react-native';
import { TextInput, Surface, useTheme } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const CodeInput = ({ code, setCode, suggestions = [], onSuggestionPress }) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const isSuggestionPressing = useRef(false); // Flag to track suggestion press

  const handleChangeText = (text) => {
    const cleanedText = text.toUpperCase().replace(/[^A-Z0-9/]/g, '');
    setCode(cleanedText);
    Haptics.selectionAsync();
  };

  const handleSuggestionPress = (suggestion) => {
    console.log('handleSuggestionPress called with:', suggestion);
    
    // Indicate that a suggestion is being pressed
    isSuggestionPressing.current = true;

    // Provide haptic feedback
    Haptics.selectionAsync().catch(err => console.log('Haptics error:', err));

    // Call the parent handler with the selected suggestion
    onSuggestionPress(suggestion);

    // Hide suggestions
    setIsFocused(false);

    // Reset the flag after a short delay to allow `onBlur` to recognize the press
    setTimeout(() => {
      isSuggestionPressing.current = false;
    }, 100);
  };

  const renderSuggestions = () => {
    console.log(
      'Rendering suggestions. isFocused:',
      isFocused,
      'suggestions length:',
      suggestions.length
    );
    if (!isFocused || !suggestions.length) {
      console.log('Not showing suggestions - conditions not met');
      return null;
    }

    return (
      <Surface style={styles.suggestionsContainer}>
        <View style={styles.scrollViewWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            scrollEventThrottle={16}
            decelerationRate="normal"
            contentContainerStyle={styles.suggestionsScrollContent}
            style={styles.scrollView}
          >
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => handleSuggestionPress(suggestion)}
              activeOpacity={0.7}
            >
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionText}>{suggestion.code}</Text>
                <Text style={styles.suggestionSubtext}>{suggestion.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>
      </Surface>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={code}
        onChangeText={handleChangeText}
        style={styles.input}
        keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
        autoCapitalize="characters"
        placeholder="Enter Code"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        onFocus={() => {
          console.log('TextInput onFocus triggered');
          setIsFocused(true);
        }}
        onBlur={() => {
          console.log('TextInput onBlur triggered');
          // Only set isFocused to false if a suggestion was not pressed
          setTimeout(() => {
            if (!isSuggestionPressing.current) {
              console.log('Executing delayed blur');
              setIsFocused(false);
            } else {
              console.log('Suggestion was pressed, not executing blur');
            }
          }, 300);
        }}
        autoComplete="off"
        autoCorrect={false}
        mode="flat"
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        theme={{
          colors: {
            primary: '#10B981',
            text: '#FFFFFF',
            placeholder: 'rgba(255, 255, 255, 0.5)',
            background: 'transparent',
          },
        }}
        contentStyle={styles.inputContent}
      />
      {renderSuggestions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    paddingBottom: SCREEN_HEIGHT * 0.025,
  },
  input: {
    fontSize: SCREEN_HEIGHT * 0.024,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    height: SCREEN_HEIGHT * 0.07,
    borderRadius: SCREEN_HEIGHT * 0.03,
    borderTopLeftRadius: SCREEN_HEIGHT * 0.03,
    borderTopRightRadius: SCREEN_HEIGHT * 0.03,
    color: '#FFFFFF',
    borderWidth: SCREEN_HEIGHT * 0.001875,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  inputContent: {
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.09,
    left: 0,
    right: 0,
    maxHeight: SCREEN_HEIGHT * 0.25,
    borderRadius: SCREEN_HEIGHT * 0.02,
    backgroundColor: 'rgba(22, 24, 29, 0.98)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.5)',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  scrollViewWrapper: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  suggestionsScrollContent: {
    paddingHorizontal: SCREEN_HEIGHT * 0.012,
    paddingVertical: SCREEN_HEIGHT * 0.012,
    flexDirection: 'row',
  },
  suggestionItem: {
    marginRight: SCREEN_HEIGHT * 0.012,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: SCREEN_HEIGHT * 0.015,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.4)',
    overflow: 'hidden',
    width: SCREEN_HEIGHT * 0.25,
  },
  suggestionContent: {
    padding: SCREEN_HEIGHT * 0.012,
  },
  suggestionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: SCREEN_HEIGHT * 0.019,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  suggestionSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: SCREEN_HEIGHT * 0.016,
    letterSpacing: 0.3,
  },
});

export default React.memo(CodeInput);
