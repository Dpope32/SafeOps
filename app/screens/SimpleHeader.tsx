import React from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { Title } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const scaleFactor = Math.min(width, height) / 400; // Base scale on smallest dimension

const SimpleHeader: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { marginTop: insets.top }]}>
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <Title style={[styles.headerText, { fontSize: 48 * scaleFactor }]}>
          SafeOps
        </Title>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 50,
    flex: 0,
  },
  gradientContainer: {
    padding: 20 * scaleFactor,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 20,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export default SimpleHeader;

