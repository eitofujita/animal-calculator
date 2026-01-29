import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useI18n } from '../i18n/I18nContext';
import { useThemeColors } from '../theme/useThemeColors';
import { typography, spacing, radius, shadows, colors } from '../theme/designTokens';
import { EmptyState } from '../components/ui/EmptyState';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SecondaryButton } from '../components/ui/SecondaryButton';
import { RemindersHeaderButton } from '../components/ui/RemindersHeaderButton';
import { SettingsHeaderButton } from '../components/ui/SettingsHeaderButton';
import {
  HealthLogCategory,
  HealthLogEntry,
} from '../domain/types';
import {
  getHealthLogsByDate,
  addHealthLogEntry,
  deleteHealthLogEntry,
} from '../utils/storage';

const CATEGORIES: HealthLogCategory[] = [
  HealthLogCategory.WEIGHT,
  HealthLogCategory.DIET,
  HealthLogCategory.EXCRETION,
  HealthLogCategory.EXERCISE,
  HealthLogCategory.SLEEP,
  HealthLogCategory.SYMPTOMS,
];

const EXCRETION_OPTIONS = [
  'healthLogExcretionNormal',
  'healthLogExcretionSoft',
  'healthLogExcretionDiarrhea',
  'healthLogExcretionConstipation',
] as const;

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function formatDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getCalendarGridRows(year: number, month: number): (number | null)[][] {
  const first = new Date(year, month, 1);
  const firstWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const flat: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) flat.push(null);
  for (let d = 1; d <= daysInMonth; d++) flat.push(d);
  while (flat.length < 42) flat.push(null);
  const rows: (number | null)[][] = [];
  for (let r = 0; r < 6; r++) rows.push(flat.slice(r * 7, (r + 1) * 7));
  return rows;
}

export const WeightLogScreen: React.FC = () => {
  const { t } = useI18n();
  const theme = useThemeColors();
  const insets = useSafeAreaInsets();

  const [selectedDate, setSelectedDate] = useState(formatDateKey(new Date()));
  const [entries, setEntries] = useState<HealthLogEntry[]>([]);
  const [modalCategory, setModalCategory] = useState<HealthLogCategory | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [inputValue, setInputValue] = useState('');
  const [inputNote, setInputNote] = useState('');
  const [excretionChoice, setExcretionChoice] = useState<string>('');

  const loadEntries = useCallback(async (date: string) => {
    const list = await getHealthLogsByDate(date);
    setEntries(list);
  }, []);

  useEffect(() => {
    loadEntries(selectedDate);
  }, [selectedDate, loadEntries]);

  const goPrevDay = () => {
    const d = new Date(selectedDate + 'T12:00:00');
    d.setDate(d.getDate() - 1);
    setSelectedDate(formatDateKey(d));
  };

  const goNextDay = () => {
    const d = new Date(selectedDate + 'T12:00:00');
    d.setDate(d.getDate() + 1);
    setSelectedDate(formatDateKey(d));
  };

  const openCalendar = () => {
    setCalendarMonth(new Date(selectedDate + 'T12:00:00'));
    setShowCalendar(true);
  };

  const closeCalendar = () => setShowCalendar(false);

  const goPrevMonth = () => {
    setCalendarMonth((prev) => {
      const d = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      return d;
    });
  };

  const goNextMonth = () => {
    setCalendarMonth((prev) => {
      const d = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      return d;
    });
  };

  const onSelectCalendarDay = (day: number) => {
    const y = calendarMonth.getFullYear();
    const m = calendarMonth.getMonth();
    const key = formatDateKey(new Date(y, m, day));
    setSelectedDate(key);
    closeCalendar();
  };

  const openAddModal = (category: HealthLogCategory) => {
    setModalCategory(category);
    setInputValue('');
    setInputNote('');
    setExcretionChoice('');
  };

  const closeModal = () => {
    setModalCategory(null);
    setInputValue('');
    setInputNote('');
    setExcretionChoice('');
  };

  const getCategoryLabel = (cat: HealthLogCategory): string => {
    const keyMap: Record<HealthLogCategory, string> = {
      [HealthLogCategory.WEIGHT]: 'healthLogCategoryWeight',
      [HealthLogCategory.DIET]: 'healthLogCategoryDiet',
      [HealthLogCategory.EXCRETION]: 'healthLogCategoryExcretion',
      [HealthLogCategory.EXERCISE]: 'healthLogCategoryExercise',
      [HealthLogCategory.SLEEP]: 'healthLogCategorySleep',
      [HealthLogCategory.SYMPTOMS]: 'healthLogCategorySymptoms',
    };
    return t(keyMap[cat] as any);
  };

  const getPlaceholder = (cat: HealthLogCategory): string => {
    const map: Record<HealthLogCategory, string> = {
      [HealthLogCategory.WEIGHT]: 'healthLogPlaceholderWeight',
      [HealthLogCategory.DIET]: 'healthLogPlaceholderDiet',
      [HealthLogCategory.EXCRETION]: 'healthLogPlaceholderExcretion',
      [HealthLogCategory.EXERCISE]: 'healthLogPlaceholderExercise',
      [HealthLogCategory.SLEEP]: 'healthLogPlaceholderSleep',
      [HealthLogCategory.SYMPTOMS]: 'healthLogPlaceholderSymptoms',
    };
    return t(map[cat] as any);
  };

  const handleSaveEntry = async () => {
    if (!modalCategory) return;
    const value = modalCategory === HealthLogCategory.EXCRETION && excretionChoice
      ? t(excretionChoice as any)
      : inputValue.trim();
    if (!value) return;

    await addHealthLogEntry({
      date: selectedDate,
      category: modalCategory,
      value,
      note: inputNote.trim() || undefined,
    });
    await loadEntries(selectedDate);
    closeModal();
  };

  const handleDeleteEntry = (id: string) => {
    Alert.alert(
      t('healthLogDelete'),
      t('healthLogDeleteConfirm'),
      [
        { text: t('healthLogDelete'), style: 'destructive', onPress: async () => {
          await deleteHealthLogEntry(id);
          await loadEntries(selectedDate);
        }},
        { text: t('healthLogCancel'), style: 'cancel' },
      ]
    );
  };

  const isToday = selectedDate === formatDateKey(new Date());

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <SettingsHeaderButton />
      <RemindersHeaderButton />
      <View style={[styles.header, { paddingHorizontal: spacing.headerPaddingHorizontal, paddingTop: insets.top + spacing.screenTop }]}>
        <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={1} ellipsizeMode="tail">
          {t('healthLogTitle')}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]} numberOfLines={2}>
          {t('healthLogSubtitle')}
        </Text>

        <View style={styles.dateRow}>
          <TouchableOpacity onPress={goPrevDay} style={[styles.dateArrow, { borderColor: theme.border }]}>
            <Text style={{ color: theme.textPrimary, fontSize: 18 }}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dateTextTouch, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={openCalendar}
            activeOpacity={0.8}
          >
            <Text style={[styles.dateText, { color: theme.textPrimary }]} numberOfLines={1}>
              {isToday ? t('daysLeftToday') : selectedDate}
            </Text>
            <Text style={[styles.dateHint, { color: theme.textTertiary }]}>{t('healthLogSelectDate')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goNextDay} style={[styles.dateArrow, { borderColor: theme.border }]}>
            <Text style={{ color: theme.textPrimary, fontSize: 18 }}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {entries.length === 0 ? (
        <EmptyState
          title={t('healthLogEmpty')}
          subtitle={t('healthLogSubtitle')}
        />
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingHorizontal: spacing.screenHorizontal, paddingBottom: spacing.xxl }]}
          showsVerticalScrollIndicator={false}
        >
          {entries.map((entry) => (
            <View
              key={entry.id}
              style={[styles.entryCard, { backgroundColor: theme.surface, borderColor: theme.border }, shadows.card]}
            >
              <View style={styles.entryRow}>
                <Text style={[styles.entryCategory, { color: theme.textTertiary }]}>
                  {getCategoryLabel(entry.category)}
                </Text>
                <TouchableOpacity onPress={() => handleDeleteEntry(entry.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text style={[styles.deleteBtn, { color: theme.error }]}>{t('healthLogDelete')}</Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.entryValue, { color: theme.textPrimary }]}>{entry.value}</Text>
              {entry.note ? (
                <Text style={[styles.entryNote, { color: theme.textSecondary }]}>{entry.note}</Text>
              ) : null}
            </View>
          ))}
        </ScrollView>
      )}

      <View style={[styles.categoryWrap, { paddingHorizontal: spacing.screenHorizontal, paddingBottom: spacing.lg + insets.bottom }]}>
        <Text style={[styles.categoryTitle, { color: theme.textSecondary }]}>
          {t('weightLogAddRecord')}
        </Text>
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={() => openAddModal(cat)}
              activeOpacity={0.8}
            >
              <Text style={[styles.categoryChipText, { color: theme.textPrimary }]} numberOfLines={1}>
                {getCategoryLabel(cat)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Modal visible={showCalendar} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeCalendar}>
          <TouchableOpacity
            style={[styles.calendarModalContent, { backgroundColor: theme.surface }]}
            activeOpacity={1}
            onPress={() => {}}
          >
            <Text style={[styles.calendarTitle, { color: theme.textPrimary }]}>{t('healthLogCalendarTitle')}</Text>
            <View style={styles.calendarMonthRow}>
              <TouchableOpacity onPress={goPrevMonth} style={[styles.calendarMonthArrow, { borderColor: theme.border }]}>
                <Text style={{ color: theme.textPrimary, fontSize: 18 }}>‹</Text>
              </TouchableOpacity>
              <Text style={[styles.calendarMonthText, { color: theme.textPrimary }]}>
                {calendarMonth.getFullYear()} / {String(calendarMonth.getMonth() + 1).padStart(2, '0')}
              </Text>
              <TouchableOpacity onPress={goNextMonth} style={[styles.calendarMonthArrow, { borderColor: theme.border }]}>
                <Text style={{ color: theme.textPrimary, fontSize: 18 }}>›</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.calendarWeekdayRow}>
              {WEEKDAY_LABELS.map((label, i) => (
                <Text key={i} style={[styles.calendarWeekdayCell, { color: theme.textTertiary }]}>{label}</Text>
              ))}
            </View>
            <View style={styles.calendarGrid}>
              {getCalendarGridRows(calendarMonth.getFullYear(), calendarMonth.getMonth()).map((row, rowIndex) => (
                <View key={rowIndex} style={styles.calendarGridRow}>
                  {row.map((day, colIndex) => {
                    const todayKey = formatDateKey(new Date());
                    const cellKey = day !== null
                      ? formatDateKey(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day))
                      : '';
                    const isSelected = cellKey === selectedDate;
                    const isToday = cellKey === todayKey;
                    return (
                      <TouchableOpacity
                        key={colIndex}
                        style={[
                          styles.calendarDayCell,
                          { backgroundColor: theme.background, borderColor: theme.border },
                          day === null && styles.calendarDayEmpty,
                          isSelected && { backgroundColor: colors.primary, borderColor: colors.primary },
                          isToday && !isSelected && { borderColor: colors.primary, borderWidth: 2 },
                        ]}
                        onPress={() => day !== null && onSelectCalendarDay(day)}
                        disabled={day === null}
                      >
                        {day !== null && (
                          <Text
                            style={[
                              styles.calendarDayText,
                              { color: isSelected ? colors.textOnPrimary : theme.textPrimary },
                            ]}
                          >
                            {day}
                          </Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
            <View style={styles.calendarFooter}>
              <SecondaryButton title={t('healthLogCancel')} onPress={closeCalendar} />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal visible={modalCategory !== null} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeModal}>
          <TouchableOpacity
            style={[styles.modalContent, { backgroundColor: theme.surface }]}
            activeOpacity={1}
            onPress={() => {}}
          >
          {modalCategory !== null && (
            <>
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                {getCategoryLabel(modalCategory)}
              </Text>

              {modalCategory === HealthLogCategory.EXCRETION ? (
                <View style={styles.excretionOptions}>
                  {EXCRETION_OPTIONS.map((key) => (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.excretionBtn,
                        { borderColor: theme.border },
                        excretionChoice === key && { borderColor: theme.primary, backgroundColor: theme.primary + '18' },
                      ]}
                      onPress={() => setExcretionChoice(excretionChoice === key ? '' : key)}
                    >
                      <Text style={[styles.excretionBtnText, { color: excretionChoice === key ? theme.primary : theme.textPrimary }]}>
                        {t(key as any)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <TextInput
                  style={[styles.input, { backgroundColor: theme.background, color: theme.textPrimary, borderColor: theme.border }]}
                  placeholder={getPlaceholder(modalCategory)}
                  placeholderTextColor={theme.textTertiary}
                  value={inputValue}
                  onChangeText={setInputValue}
                  keyboardType={
                    modalCategory === HealthLogCategory.WEIGHT ||
                    modalCategory === HealthLogCategory.EXERCISE ||
                    modalCategory === HealthLogCategory.SLEEP
                      ? 'decimal-pad'
                      : 'default'
                  }
                />
              )}

              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Note (optional)</Text>
              <TextInput
                style={[styles.input, styles.inputNote, { backgroundColor: theme.background, color: theme.textPrimary, borderColor: theme.border }]}
                placeholder=""
                placeholderTextColor={theme.textTertiary}
                value={inputNote}
                onChangeText={setInputNote}
                multiline
              />

              <View style={styles.modalButtons}>
                <SecondaryButton title={t('healthLogCancel')} onPress={closeModal} />
                <View style={styles.modalButtonSpacer} />
                <PrimaryButton
                  title={t('healthLogSave')}
                  onPress={handleSaveEntry}
                  disabled={
                    modalCategory === HealthLogCategory.EXCRETION
                      ? !excretionChoice
                      : !inputValue.trim()
                  }
                />
              </View>
            </>
          )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingBottom: spacing.sm },
  title: { ...typography.h1, textAlign: 'center' },
  subtitle: { ...typography.bodySmall, marginTop: spacing.xxs, textAlign: 'center' },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  dateArrow: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTextTouch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  dateText: { ...typography.bodySmall },
  dateHint: { ...typography.caption, marginLeft: spacing.xs },
  scroll: { flex: 1 },
  content: { paddingTop: spacing.md, paddingBottom: spacing.xxl },
  entryCard: {
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs },
  entryCategory: { ...typography.label },
  deleteBtn: { ...typography.bodySmall, fontWeight: '600' },
  entryValue: { ...typography.body, marginBottom: spacing.xxs },
  entryNote: { ...typography.caption },
  categoryWrap: { paddingTop: spacing.md },
  categoryTitle: { ...typography.label, marginBottom: spacing.sm },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  categoryChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  categoryChipText: { ...typography.bodySmall, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarModalContent: {
    marginHorizontal: spacing.lg,
    borderRadius: radius.xl,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
  },
  calendarTitle: { ...typography.h2, marginBottom: spacing.md, textAlign: 'center' },
  calendarMonthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  calendarMonthArrow: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarMonthText: { ...typography.h3 },
  calendarWeekdayRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  calendarWeekdayCell: {
    flex: 1,
    ...typography.caption,
    textAlign: 'center',
    fontWeight: '600',
  },
  calendarGrid: {},
  calendarGridRow: { flexDirection: 'row', marginBottom: spacing.xs },
  calendarDayCell: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 40,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  calendarDayEmpty: { backgroundColor: 'transparent', borderColor: 'transparent' },
  calendarDayText: { ...typography.bodySmall, fontWeight: '600' },
  calendarFooter: { marginTop: spacing.lg, alignItems: 'center' },
  modalContent: {
    marginHorizontal: spacing.lg,
    borderRadius: radius.xl,
    padding: spacing.lg,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  modalTitle: { ...typography.h2, marginBottom: spacing.md },
  input: {
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...typography.body,
    marginBottom: spacing.md,
  },
  inputLabel: { ...typography.label, marginBottom: spacing.xs },
  inputNote: { minHeight: 60 },
  excretionOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  excretionBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  excretionBtnText: { ...typography.bodySmall, fontWeight: '600' },
  modalButtons: { flexDirection: 'row', marginTop: spacing.md },
  modalButtonSpacer: { width: spacing.sm },
});
