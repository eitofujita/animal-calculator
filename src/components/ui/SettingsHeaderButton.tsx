import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../../theme/useThemeColors';
import { spacing, radius } from '../../theme/designTokens';
import { useSettingsOpen } from '../../contexts/SettingsContext';

export const SettingsHeaderButton: React.FC = () => {
  const { openSettings } = useSettingsOpen();
  const theme = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrap,
        {
          top: insets.top + spacing.xs,
          left: spacing.screenHorizontal,
        },
      ]}
      pointerEvents="box-none"
    >
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.surface, borderColor: theme.border }]}
        onPress={openSettings}
        activeOpacity={0.8}
      >
        <Ionicons name="settings-outline" size={24} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    zIndex: 100,
    alignItems: 'flex-start',
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
