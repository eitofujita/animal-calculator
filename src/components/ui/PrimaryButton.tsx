import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, radius, typography, touchTarget, shadows } from '../../theme/designTokens';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
}) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.buttonDisabled]}
    onPress={onPress}
    activeOpacity={0.8}
    disabled={disabled || loading}
  >
    {loading ? (
      <ActivityIndicator color={colors.textOnPrimary} />
    ) : (
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

const minHeight = Math.max(touchTarget.minHeight, 48);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: touchTarget.buttonPaddingVertical,
    paddingHorizontal: touchTarget.buttonPaddingHorizontal,
    minHeight,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    maxWidth: '100%',
    ...shadows.button,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: typography.h3.fontWeight,
    letterSpacing: 0.4,
    flexShrink: 1,
  },
});
