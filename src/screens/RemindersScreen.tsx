import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../i18n/I18nContext';
import { useThemeColors } from '../theme/useThemeColors';
import { typography, spacing, radius, colors } from '../theme/designTokens';
import { EmptyState } from '../components/ui/EmptyState';

const FILTERS = ['remindersFilterAll', 'remindersFilterMedication', 'remindersFilterVaccine', 'remindersFilterVet'] as const;

export const RemindersScreen: React.FC = () => {
  const { t } = useI18n();
  const theme = useThemeColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { width: windowWidth } = useWindowDimensions();
  const hasReminders = false;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background, width: windowWidth }]}>
      <View style={[styles.topSection, { width: windowWidth }]}>
        <View style={[styles.header, { paddingTop: insets.top + spacing.screenTop }]}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color={theme.primary} />
          </TouchableOpacity>
          <View style={[styles.titleWrap, { paddingHorizontal: spacing.headerPaddingHorizontal }]}>
            <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={1} ellipsizeMode="tail">
              {t('remindersTitle')}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.primary }]}
            onPress={() => {}}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.filterRow, { width: windowWidth }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.filterScroll}
            style={[styles.filterScrollView, { width: windowWidth }]}
          >
            {FILTERS.map((key) => (
              <View key={key} style={[styles.chip, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={[styles.chipText, { color: theme.textPrimary }]} numberOfLines={1}>
                  {t(key)}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {!hasReminders ? (
        <EmptyState
          title={t('firstReminderCta')}
          subtitle={t('remindersEmpty')}
          actionLabel={t('homeAddReminder')}
          onAction={() => {}}
        />
      ) : (
        <View style={[styles.list, { paddingHorizontal: spacing.screenHorizontal }]}>
          <Text style={[styles.placeholder, { color: theme.textSecondary }]}>{t('remindersEmpty')}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  topSection: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: spacing.sm,
    minHeight: 56,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  titleWrap: { flex: 1, minWidth: 0, marginRight: spacing.sm, justifyContent: 'center' },
  title: { ...typography.h1, textAlign: 'center' },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  addButtonText: {
    color: colors.textOnPrimary,
    fontSize: 24,
    fontWeight: '300',
  },
  filterRow: {
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  filterScrollView: {
    maxHeight: 48,
  },
  filterScroll: {
    paddingLeft: spacing.screenHorizontal,
    paddingRight: spacing.screenHorizontal,
    paddingVertical: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: spacing.xs,
  },
  chipText: { ...typography.bodySmall, fontWeight: '600', fontSize: 14 },
  list: { flex: 1, paddingTop: spacing.sm },
  placeholder: { ...typography.bodySmall },
});
