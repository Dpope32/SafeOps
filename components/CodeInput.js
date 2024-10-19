import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;

const CodeInput = ({ code, setCode }) => {
  const theme = useTheme();
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  return (
    <View style={styles.container}>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        autoFocus={true}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[
              styles.cell,
            ]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor color="white" /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  codeFieldRoot: {
    borderWidth: 8,
    borderColor: '#000'
  },
  cell: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#21439c',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  focusCell: {
    borderColor: '#3b5998',
  },
  cellText: {
    fontSize: 36,
    textAlign: 'center',
    color: '#FFFFFF', // Set text color to white
    fontWeight: 'bold',
    textShadowColor: '#000000', // Shadow color (black for contrast)
    textShadowOffset: { width: 1, height: 1 }, // Offset for subtle shadow effect
    textShadowRadius: 2, // Shadow radius for slight blur
  },
});

export default CodeInput;
