import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../../theme/useThemeColors';
import { spacing, radius } from '../../theme/designTokens';

export const RemindersHeaderButton: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useThemeColors();
  const insets = useSafeAreaInsets();

  if (route.name === 'Reminders') return null;

  return (
    <View
      style={[
        styles.wrap,
        {
          top: insets.top + spacing.xs,
          right: spacing.screenHorizontal,
        },
      ]}
      pointerEvents="box-none"
    >
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.surface, borderColor: theme.border }]}
        onPress={() => navigation.getParent()?.navigate('Reminders' as never)}
        activeOpacity={0.8}
      >
        <Ionicons name="notifications-outline" size={24} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    zIndex: 100,
    alignItems: 'flex-end',
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
