import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import useStore from '../store/useStore';
import { DarkTheme, DefaultTheme } from 'react-native-paper';

export default function Layout() {
  const darkMode = useStore((state) => state.darkMode);
  const theme = darkMode ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <Stack />
    </PaperProvider>
  );
}