import React, { useState } from 'react';
import { Modal, View, Text as RNText } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import useStore from '../store/useStore';
import { modalStyles, inputTheme } from './styles/ModalStyles';

interface UsernameModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const UsernameModal = ({ visible, onDismiss }: UsernameModalProps) => {
  const [name, setName] = useState('');
  const setUsername = useStore((state: { setUsername: (name: string) => void }) => state.setUsername);

  const handleSave = () => {
    if (name.trim()) {
      setUsername(name.trim());
      onDismiss();
    }
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
          <Text style={modalStyles.title}>Welcome!</Text>
          <Text style={[modalStyles.label, { textAlign: 'center', marginBottom: 24 }]}>
            What would you like to be called?
          </Text>
          
          <TextInput
            value={name}
            onChangeText={setName}
            style={modalStyles.input}
            placeholder="Enter a username"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            autoFocus
            mode="outlined"
            outlineColor="rgba(59, 130, 246, 0.3)"
            activeOutlineColor="rgba(59, 130, 246, 0.8)"
            textColor="#FFFFFF"
            theme={inputTheme}
          />
          
          <View style={modalStyles.buttonContainer}>
            <Button 
              mode="contained" 
              onPress={handleSave}
              disabled={!name.trim()}
              style={modalStyles.button}
              contentStyle={modalStyles.buttonContent}
              labelStyle={modalStyles.buttonLabel}
              theme={{
                colors: {
                  primary: 'rgba(56, 189, 248, 0.25)',
                }
              }}
            >
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UsernameModal;
