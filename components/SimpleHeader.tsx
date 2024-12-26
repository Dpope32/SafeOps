import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_HEIGHT = Dimensions.get('window').height;

import SettingsModal from './SettingsModal';

const SimpleHeader = ({ title = 'Clark' }) => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.headerContainer, { marginTop: insets.top }]}>
      <View style={styles.headerContent}>
        <Title style={[styles.headerText, { fontSize: SCREEN_HEIGHT * 0.02 }]}>
          {title}
        </Title>
        {title === 'Clark' && (
          <IconButton
            icon="cog"
            iconColor="#60A5FA"
            size={SCREEN_HEIGHT * 0.025}
            onPress={() => setModalVisible(true)}
            style={styles.iconButton}
          />
        )}
      </View>
      <SettingsModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: '#1A1D1E',
    paddingTop: SCREEN_HEIGHT * 0.0075,
    paddingBottom: SCREEN_HEIGHT * 0.0125,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: SCREEN_HEIGHT * 0.03,
    paddingVertical: SCREEN_HEIGHT * 0.01,
    borderTopWidth: SCREEN_HEIGHT * 0.001875,
    borderBottomWidth: SCREEN_HEIGHT * 0.001875,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.8,
    textShadowColor: 'rgba(255, 255, 255, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  iconButton: {
    margin: 0,
    backgroundColor: 'rgba(59, 130, 246, 0.25)',
    borderWidth: SCREEN_HEIGHT * 0.001875,
    borderColor: 'rgba(59, 130, 246, 0.4)',
  }
});

export default SimpleHeader;
