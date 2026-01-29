import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { useI18n } from '../i18n/I18nContext';
import { Language } from '../i18n';
import { useTheme, Theme } from '../contexts/ThemeContext';
import { useThemeColors } from '../theme/useThemeColors';
import { colors, spacing, radius, typography, shadows } from '../theme/designTokens';

interface SettingsProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * Settings Component
 * Displays app settings in a modal
 */
export const Settings: React.FC<SettingsProps> = ({ visible, onClose }) => {
  const { language, setLanguage, t, getAvailableLanguages } = useI18n();
  const { theme, setTheme, isDark } = useTheme();
  const themeColors = useThemeColors();
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(300)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;
  
  const availableLanguages = React.useMemo(() => getAvailableLanguages(), [getAvailableLanguages]);
  
  const handleLanguageSelect = async (lang: Language) => {
    await setLanguage(lang);
    setShowLanguagePicker(false);
  };
  
  const handleThemeSelect = async (newTheme: Theme) => {
    await setTheme(newTheme);
    setShowThemePicker(false);
  };
  
  const getLanguageName = (lang: Language): string => {
    return lang === 'en' ? t('english') : t('japanese');
  };
  
  const getThemeName = (themeValue: Theme): string => {
    return themeValue === 'light' ? t('light') : t('dark');
  };
  
  const backgroundColor = themeColors.surface;
  const textColor = themeColors.textPrimary;
  const secondaryTextColor = themeColors.textSecondary;
  const cardBackground = isDark ? colors.dark.surface : colors.borderLight;
  const cardBorderColor = themeColors.border;

  React.useEffect(() => {
    if (visible) {
      // Start animation when modal becomes visible
      slideAnim.setValue(300);
      overlayOpacity.setValue(0);
      // Use requestAnimationFrame to ensure modal is rendered before animation
      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
          }),
          Animated.timing(overlayOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      // Reset when hidden
      slideAnim.setValue(300);
      overlayOpacity.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 300,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View style={[styles.modalOverlay, { opacity: overlayOpacity }]}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={handleClose}
        />
        <Animated.View
          style={[
            styles.settingsContainer,
            {
              transform: [{ translateY: slideAnim }],
              backgroundColor,
            },
          ]}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={[styles.header, { backgroundColor: colors.primary }]}>
              <Text style={styles.headerTitle}>{t('settings')}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
                activeOpacity={0.7}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.content}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: textColor }]}>{t('general')}</Text>
                
                <TouchableOpacity
                  style={[styles.settingItem, { backgroundColor: cardBackground, borderColor: cardBorderColor }]}
                  onPress={() => setShowLanguagePicker(true)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.settingLabel, { color: textColor }]}>{t('language')}</Text>
                  <View style={styles.settingValueContainer}>
                    <Text style={[styles.settingValue, { color: secondaryTextColor }]}>{getLanguageName(language)}</Text>
                    <Text style={[styles.chevron, { color: secondaryTextColor }]}>›</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.settingItem, { backgroundColor: cardBackground, borderColor: cardBorderColor }]}
                  onPress={() => setShowThemePicker(true)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.settingLabel, { color: textColor }]}>{t('theme')}</Text>
                  <View style={styles.settingValueContainer}>
                    <Text style={[styles.settingValue, { color: secondaryTextColor }]}>{getThemeName(theme)}</Text>
                    <Text style={[styles.chevron, { color: secondaryTextColor }]}>›</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: textColor }]}>{t('data')}</Text>
                
                <View style={[styles.settingItem, { backgroundColor: cardBackground, borderColor: cardBorderColor }]}>
                  <Text style={[styles.settingLabel, { color: textColor }]}>{t('autoSave')}</Text>
                  <Text style={[styles.settingValue, { color: secondaryTextColor }]}>{t('enabled')}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: textColor }]}>{t('aboutSection')}</Text>
                
                <View style={[styles.settingItem, { backgroundColor: cardBackground, borderColor: cardBorderColor }]}>
                  <Text style={[styles.settingLabel, { color: textColor }]}>{t('version')}</Text>
                  <Text style={[styles.settingValue, { color: secondaryTextColor }]}>1.0.0</Text>
                </View>

                <View style={[styles.settingItem, { backgroundColor: cardBackground, borderColor: cardBorderColor }]}>
                  <Text style={[styles.settingLabel, { color: textColor }]}>{t('appName')}</Text>
                  <Text style={[styles.settingValue, { color: secondaryTextColor }]}>{t('appName')}</Text>
                </View>
              </View>
              
              {/* Language Picker Modal */}
              <Modal
                visible={showLanguagePicker}
                transparent
                animationType="fade"
                onRequestClose={() => setShowLanguagePicker(false)}
              >
                <TouchableOpacity
                  style={styles.languagePickerOverlay}
                  activeOpacity={1}
                  onPress={() => setShowLanguagePicker(false)}
                >
                  <View style={[styles.languagePickerContainer, { backgroundColor }]}>
                    <Text style={[styles.languagePickerTitle, { color: textColor }]}>{t('language')}</Text>
                    {availableLanguages.map((lang: { code: Language; name: string }) => (
                      <TouchableOpacity
                        key={lang.code}
                        style={[
                          styles.languageOption,
                          { backgroundColor: cardBackground },
                          language === lang.code && styles.languageOptionSelected,
                        ]}
                        onPress={() => handleLanguageSelect(lang.code)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.languageOptionText,
                            { color: textColor },
                            language === lang.code && styles.languageOptionTextSelected,
                          ]}
                        >
                          {lang.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>
              
              {/* Theme Picker Modal */}
              <Modal
                visible={showThemePicker}
                transparent
                animationType="fade"
                onRequestClose={() => setShowThemePicker(false)}
              >
                <TouchableOpacity
                  style={styles.languagePickerOverlay}
                  activeOpacity={1}
                  onPress={() => setShowThemePicker(false)}
                >
                  <View style={[styles.languagePickerContainer, { backgroundColor }]}>
                    <Text style={[styles.languagePickerTitle, { color: textColor }]}>{t('theme')}</Text>
                    {(['light', 'dark'] as Theme[]).map((themeValue: Theme) => (
                      <TouchableOpacity
                        key={themeValue}
                        style={[
                          styles.languageOption,
                          { backgroundColor: cardBackground },
                          theme === themeValue && styles.languageOptionSelected,
                        ]}
                        onPress={() => handleThemeSelect(themeValue)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.languageOptionText,
                            { color: textColor },
                            theme === themeValue && styles.languageOptionTextSelected,
                          ]}
                        >
                          {getThemeName(themeValue)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  overlayTouchable: {
    flex: 1,
  },
  settingsContainer: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: '90%',
    minHeight: 400,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...shadows.card,
    zIndex: 1000,
  },
  safeArea: {
    flex: 1,
    minHeight: 400,
  },
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.screenHorizontal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textOnPrimary,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: colors.textOnPrimary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.screenHorizontal,
    paddingBottom: spacing.xxl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
  },
  settingLabel: {
    ...typography.body,
    fontWeight: '600',
  },
  settingValue: {
    ...typography.body,
    fontWeight: '500',
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    fontSize: 20,
    marginLeft: spacing.xs,
  },
  languagePickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languagePickerContainer: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    width: '80%',
    maxWidth: 300,
    ...shadows.card,
  },
  languagePickerTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.xs,
  },
  languageOptionSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '20',
  },
  languageOptionText: {
    ...typography.body,
    fontWeight: '600',
  },
  languageOptionTextSelected: {
    color: colors.primary,
  },
});
