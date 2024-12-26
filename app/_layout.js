import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import useStore from '../store/useStore';
import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';
import { View, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const darkMode = useStore((state) => state.darkMode);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          'MaterialIcons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
          'MaterialCommunityIcons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
          'material-community': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
          'material': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf')
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  const fontConfig = {
    bodyLarge: {
      fontFamily: 'System',
    },
    bodyMedium: {
      fontFamily: 'System',
    },
    bodySmall: {
      fontFamily: 'System',
    },
    labelLarge: {
      fontFamily: 'System',
    },
    labelMedium: {
      fontFamily: 'System',
    },
    labelSmall: {
      fontFamily: 'System',
    },
    titleLarge: {
      fontFamily: 'System',
    },
    titleMedium: {
      fontFamily: 'System',
    },
    titleSmall: {
      fontFamily: 'System',
    },
    default: {
      fontFamily: 'System',
    },
  };


  const theme = darkMode
    ? { 
        ...MD3DarkTheme, 
        fonts: configureFonts({ config: fontConfig }),
        colors: { 
          ...MD3DarkTheme.colors, 
          primary: '#3b82f6',
          onPrimary: '#FFFFFF',
        }
      }
    : { 
        ...MD3LightTheme, 
        fonts: configureFonts({ config: fontConfig }),
        colors: { 
          ...MD3LightTheme.colors, 
          primary: '#3b82f6',
          onPrimary: '#FFFFFF',
        }
      };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor="#1A1D1E"
        barStyle={'light-content'}
      />
      <PaperProvider theme={MD3DarkTheme}>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </View>
  );
}
