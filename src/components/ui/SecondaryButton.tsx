import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, radius, touchTarget } from '../../theme/designTokens';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.buttonDisabled]}
    onPress={onPress}
    activeOpacity={0.8}
    disabled={disabled}
  >
    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
      {title}
    </Text>
  </TouchableOpacity>
);

const minHeight = Math.max(touchTarget.minHeight, 44);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: touchTarget.buttonPaddingVertical - 2,
    paddingHorizontal: touchTarget.buttonPaddingHorizontal,
    minHeight,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    maxWidth: '100%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    flexShrink: 1,
  },
});
