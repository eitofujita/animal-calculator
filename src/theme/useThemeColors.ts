import { useTheme } from '../contexts/ThemeContext';
import { colors } from './designTokens';

export function useThemeColors() {
  const { isDark } = useTheme();
  if (isDark) {
    return {
      background: colors.dark.background,
      backgroundSecondary: colors.dark.backgroundSecondary,
      surface: colors.dark.surface,
      textPrimary: colors.dark.textPrimary,
      textSecondary: colors.dark.textSecondary,
      textTertiary: colors.dark.textTertiary,
      border: colors.dark.border,
      divider: colors.dark.divider,
      primary: colors.primary,
      error: colors.error,
      warning: colors.warning,
      success: colors.success,
    };
  }
  return {
    background: colors.background,
    backgroundSecondary: colors.backgroundSecondary,
    surface: colors.surface,
    textPrimary: colors.textPrimary,
    textSecondary: colors.textSecondary,
    textTertiary: colors.textTertiary,
    border: colors.border,
    divider: colors.divider,
    primary: colors.primary,
    error: colors.error,
    warning: colors.warning,
    success: colors.success,
  };
}
