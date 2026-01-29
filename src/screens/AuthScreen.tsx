import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useI18n } from '../i18n/I18nContext';
import { useThemeColors } from '../theme/useThemeColors';
import { spacing, typography } from '../theme/designTokens';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SecondaryButton } from '../components/ui/SecondaryButton';

interface AuthScreenProps {
  onContinue: () => void;
  onGoogleContinue: () => void;
  isConfigMissing?: boolean;
  isGoogleConfigMissing?: boolean;
  errorMessage?: string | null;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onContinue,
  onGoogleContinue,
  isConfigMissing,
  isGoogleConfigMissing,
  errorMessage,
}) => {
  const { t } = useI18n();
  const theme = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.lg }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>{t('authTitle')}</Text>
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {t('authDescription')}
          </Text>
          {isConfigMissing && (
            <Text style={[styles.warningText, { color: theme.textSecondary }]}>
              {t('authMissingConfigDescription')}
            </Text>
          )}
          {isGoogleConfigMissing && (
            <Text style={[styles.warningText, { color: theme.textSecondary }]}>
              {t('authGoogleUnavailable')}
            </Text>
          )}
          {errorMessage ? (
            <Text style={[styles.errorText, { color: theme.error }]}>{errorMessage}</Text>
          ) : null}
          <View style={styles.buttonWrap}>
            <PrimaryButton
              title={t('authContinue')}
              onPress={onContinue}
              disabled={!!isConfigMissing}
            />
          </View>
          <View style={styles.buttonWrap}>
            <SecondaryButton
              title={t('authGoogle')}
              onPress={onGoogleContinue}
              disabled={!!isGoogleConfigMissing}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  content: {
    paddingHorizontal: spacing.screenHorizontal,
    width: '100%',
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  warningText: {
    ...typography.bodySmall,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  errorText: {
    ...typography.bodySmall,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  buttonWrap: {
    marginBottom: spacing.sm,
  },
});
