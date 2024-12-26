import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export function App() {
  const [fontsLoaded] = useFonts({
    MaterialCommunityIcons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <ExpoRoot context={require.context('./app')} onLayout={onLayoutRootView} />;
}

registerRootComponent(App);