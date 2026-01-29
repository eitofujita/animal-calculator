import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography, spacing } from '../../theme/designTokens';
import { useThemeColors } from '../../theme/useThemeColors';
import { PrimaryButton } from './PrimaryButton';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  actionLabel,
  onAction,
}) => {
  const theme = useThemeColors();
  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={3}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: theme.textSecondary }]} numberOfLines={4}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {actionLabel && onAction ? (
        <View style={styles.buttonWrap}>
          <PrimaryButton title={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  textWrap: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodySmall,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  buttonWrap: {
    marginTop: spacing.lg,
    width: '100%',
    paddingHorizontal: spacing.sm,
  },
});
