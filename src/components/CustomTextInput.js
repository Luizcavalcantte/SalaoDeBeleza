import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default function CustomTextInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#cb8fdd',
    margin: 15,
    borderRadius: 15,
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 18,
    width: '100%',
  },
});
