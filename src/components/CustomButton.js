import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function CustomButton({ title, onPress, variant = 'primary', style }) {
  const { theme } = useApp();
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: isPrimary ? theme.primary : 'transparent',
          borderColor: theme.primary,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: isPrimary ? '#FFFFFF' : theme.primary }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
