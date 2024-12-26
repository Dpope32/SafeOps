import React, { useState, useEffect } from 'react';
import { Modal, View, Text as RNText } from 'react-native';
import { TextInput, Button, Text, Switch, List } from 'react-native-paper';
import useStore from '../store/useStore';
import { modalStyles, inputTheme } from './styles/ModalStyles';

interface SettingsModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const SettingsModal = ({ visible, onDismiss }: SettingsModalProps) => {
  const { username, theme, setUsername, setTheme } = useStore();
  const [name, setName] = useState(username || '');
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setName(username || '');
    setSelectedTheme(theme);
  }, [visible, username, theme]);

  const handleSave = () => {
    if (name.trim()) {
      setUsername(name.trim());
    }
    setTheme(selectedTheme);
    onDismiss();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.title}>Settings</Text>
          
          <RNText style={modalStyles.label}>Username:</RNText>
          <TextInput
            value={name}
            onChangeText={setName}
            style={modalStyles.input}
            placeholder="Enter a username"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            mode="outlined"
            outlineColor="rgba(59, 130, 246, 0.3)"
            activeOutlineColor="rgba(59, 130, 246, 0.8)"
            textColor="#FFFFFF"
            theme={inputTheme}
          />

          <List.Item
            title="Dark Theme"
            titleStyle={modalStyles.listItemText}
            right={() => (
              <Switch
                value={selectedTheme === 'dark'}
                onValueChange={(value) => setSelectedTheme(value ? 'dark' : 'light')}
                color="rgba(59, 130, 246, 0.8)"
              />
            )}
            style={modalStyles.listItem}
          />
          
          <View style={modalStyles.buttonContainer}>
            <Button 
              mode="contained" 
              onPress={handleSave}
              style={modalStyles.button}
              contentStyle={modalStyles.buttonContent}
              labelStyle={modalStyles.buttonLabel}
              theme={{
                colors: {
                  primary: 'rgba(56, 189, 248, 0.25)',
                }
              }}
            >
              Save Changes
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SettingsModal;
