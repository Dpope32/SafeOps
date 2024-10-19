// components/AnimatedButton.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient'; // Reintroduced LinearGradient
import { useTheme } from 'react-native-paper';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedButton = React.memo(({ onPress, title }) => {
  const scale = useSharedValue(1);
  const theme = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, {
      duration: 100,
      easing: Easing.out(Easing.ease),
    });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 100,
      easing: Easing.out(Easing.ease),
    });
  };

  const handlePress = () => {
    Haptics.selectionAsync();
    onPress();
  };

  return (
    <AnimatedTouchable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={styles.buttonContainer}
      accessibilityRole="button"
    >
      {/* Shadow applied to wrapper view with solid background color */}
      <View style={[styles.shadowContainer, { backgroundColor: theme.colors.background }]}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']} // Reintroduced gradient
          start={[0, 0]}
          end={[1, 1]}
          style={styles.gradient}
        >
          <Animated.View style={[styles.button, animatedStyle]}>
            <Text style={[styles.buttonText, { color: theme.colors.surface }]}>
              {title}
            </Text>
          </Animated.View>
        </LinearGradient>
      </View>
    </AnimatedTouchable>
  );
});

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 30, // Maintain rounded corners
  },
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    // No additional styles needed here
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AnimatedButton;
