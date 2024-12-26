import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedButton = React.memo(({ 
  onPress, 
  title, 
  variant = 'primary',
  style
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.98, {
      duration: 100,
      easing: Easing.out(Easing.ease),
    });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.out(Easing.ease),
    });
  };

  const handlePress = () => {
    Haptics.selectionAsync();
    onPress();
  };

  const buttonColors = {
    primary: ['rgba(56, 189, 248, 0.25)', 'rgba(59, 130, 246, 0.35)'], // Sky blue to blue gradient
    secondary: ['rgba(30, 58, 138, 0.3)', 'rgba(30, 58, 138, 0.4)'] // Dark blue gradient
  };

  return (
    <AnimatedTouchable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[styles.buttonContainer, style]}
      accessibilityRole="button"
    >
      <LinearGradient
        colors={buttonColors[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          variant === 'secondary' && styles.secondaryGradient
        ]}
      >
        <Animated.View style={[styles.button, animatedStyle]}>
          <Text style={[
            styles.buttonText,
            variant === 'primary' ? styles.primaryText : styles.secondaryText
          ]}>
            {title}
          </Text>
        </Animated.View>
      </LinearGradient>
    </AnimatedTouchable>
  );
});

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(59, 130, 246, 0.8)', // Subtle blue border
  },
  gradient: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  secondaryGradient: {
    borderColor: 'rgba(30, 58, 138, 0.4)',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  primaryText: {
    color: '#60A5FA', // Bright blue text
    textShadowColor: 'rgba(96, 165, 250, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  secondaryText: {
    color: '#93C5FD', // Lighter blue text
    textShadowColor: 'rgba(147, 197, 253, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  }
});

export default AnimatedButton;
