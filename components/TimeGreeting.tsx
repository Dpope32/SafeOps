import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import useStore from '../store/useStore';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const getGreeting = (hour: number): string => {
  switch (Math.floor(hour / 2)) {
    case 0:
      return "Can't sleep? Lets get it";
    case 1:
      return "Call you night owl";
    case 2:
      return "Early bird gets the worm, good morning";
    case 3:
      return "Good morning";
    case 4:
      return "About time for coffee";
    case 5:
      return "Gm";
    case 6:
      return "About time for lunch";
    case 7:
      return "Good afternoon";
    case 8:
      return "About time to head home";
    case 9:
      return "Good evening";
    case 10:
      return "Winding down";
    default:
      return "Time to rest";
  }
};

const TimeGreeting = () => {
  const [currentGreeting, setCurrentGreeting] = useState<string>('');
  const username = useStore(state => state.username);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      setCurrentGreeting(getGreeting(hour));
    };

    updateGreeting();

    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!username) return null;

  return (
    <Text style={styles.greeting}>
      {`${currentGreeting}, ${username}!`}
    </Text>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: SCREEN_HEIGHT * 0.025,
    fontWeight: '600',
    color: '#fdf5e6',
    marginTop: SCREEN_HEIGHT * 0.0675,
    marginBottom: SCREEN_HEIGHT * 0.025,
    textAlign: 'center',
    paddingHorizontal: SCREEN_HEIGHT * 0.025,
    letterSpacing: 0.5,
  },
});

export default TimeGreeting;
