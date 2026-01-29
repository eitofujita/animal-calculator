import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useI18n } from '../i18n/I18nContext';
import { useThemeColors } from '../theme/useThemeColors';
import { typography, spacing, radius, colors } from '../theme/designTokens';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SecondaryButton } from '../components/ui/SecondaryButton';
import { RemindersHeaderButton } from '../components/ui/RemindersHeaderButton';
import { SettingsHeaderButton } from '../components/ui/SettingsHeaderButton';

const VALUE_KEYS = ['proValue1', 'proValue2', 'proValue3'] as const;

export const ProScreen: React.FC = () => {
  const { t } = useI18n();
  const theme = useThemeColors();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const contentWidth = windowWidth - spacing.screenHorizontal * 2;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <SettingsHeaderButton />
      <RemindersHeaderButton />
      <ScrollView
        contentContainerStyle={[styles.content, { maxWidth: windowWidth, paddingTop: insets.top + spacing.xl }]}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={[styles.titleWrap, { width: contentWidth, paddingHorizontal: spacing.headerPaddingHorizontal }]}>
          <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={2}>
            {t('proPaywallTitle')}
          </Text>
        </View>

        <View style={styles.valueList}>
          {VALUE_KEYS.map((key) => (
            <View key={key} style={[styles.valueRow, { borderBottomColor: theme.divider }]}>
              <Text style={[styles.valueText, { color: theme.textPrimary }]} numberOfLines={3}>
                {t(key)}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.priceCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.price, { color: theme.primary }]}>{t('proPriceOneTime')}</Text>
          <Text style={[styles.priceSub, { color: theme.textSecondary }]}>{t('proPriceSubtext')}</Text>
        </View>

        <View style={styles.buttons}>
          <PrimaryButton title={t('proPurchase')} onPress={() => {}} />
          <TouchableOpacity style={styles.restoreWrap} onPress={() => {}}>
            <Text style={[styles.restoreText, { color: theme.textSecondary }]}>{t('proRestore')}</Text>
          </TouchableOpacity>
          <SecondaryButton title={t('proLater')} onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  scrollView: { flex: 1 },
  content: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: spacing.xxl,
  },
  titleWrap: {
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
  },
  valueList: {
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
  },
  valueRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  valueText: { ...typography.body, flexShrink: 1 },
  priceCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  price: {
    ...typography.display,
    textAlign: 'center',
  },
  priceSub: { ...typography.bodySmall, marginTop: spacing.xxs, textAlign: 'center' },
  buttons: { gap: spacing.sm },
  restoreWrap: { alignItems: 'center', paddingVertical: spacing.xs },
  restoreText: { ...typography.bodySmall },
});
