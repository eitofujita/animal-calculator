import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { I18nProvider, useI18n } from './src/i18n/I18nContext';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { auth, isFirebaseConfigured } from './src/firebase/firebase';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useGoogleLogin } from './src/auth/googleAuth';
import { AuthScreen } from './src/screens/AuthScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { CalculatorScreen } from './src/screens/CalculatorScreen';
import { PetProfileScreen } from './src/screens/PetProfileScreen';
import { RemindersScreen } from './src/screens/RemindersScreen';
import { WeightLogScreen } from './src/screens/WeightLogScreen';
import { ProScreen } from './src/screens/ProScreen';
import { AppTabParamList, RootStackParamList } from './src/navigation/types';
import { colors } from './src/theme/designTokens';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<AppTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppTabs: React.FC = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();

  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDark ? colors.dark.backgroundSecondary : colors.surface,
            borderTopColor: isDark ? colors.dark.border : colors.border,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: isDark ? colors.dark.textTertiary : colors.textTertiary,
        }}
      >
        <Tab.Screen
          name="Calculator"
          component={CalculatorScreen}
          options={{
            title: t('tabCalculator'),
            tabBarLabel: t('tabCalculator'),
            tabBarIcon: ({ color, size }) => <Ionicons name="calculator-outline" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="PetProfile"
          component={PetProfileScreen}
          options={{
            title: t('tabPet'),
            tabBarLabel: t('tabPet'),
            tabBarIcon: ({ color, size }) => <Ionicons name="paw-outline" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: t('tabHome'),
            tabBarLabel: t('tabHome'),
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="WeightLog"
          component={WeightLogScreen}
          options={{
            title: t('tabWeightLog'),
            tabBarLabel: t('tabWeightLog'),
            tabBarIcon: ({ color, size }) => <Ionicons name="fitness-outline" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Pro"
          component={ProScreen}
          options={{
            title: t('tabPro'),
            tabBarLabel: t('tabPro'),
            tabBarIcon: ({ color, size }) => <Ionicons name="star-outline" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
  );
};

const RootNavigator: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={AppTabs} />
        <Stack.Screen name="Reminders" component={RemindersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppGate: React.FC = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const [isReady, setIsReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // useGoogleLoginフックを使用（本物のexpo-auth-session/providers/google）
  const { request: googleRequest, response: googleResponse, login: googleLogin, handle: handleGoogleResponse } = useGoogleLogin();
  const isGoogleConfigured = Boolean(googleRequest);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsReady(true);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthed(Boolean(user));
      setIsReady(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (googleResponse) {
      handleGoogleResponse().catch((error) => {
        console.error('Google sign-in failed:', error);
        setAuthError(t('authGoogleFailed'));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleResponse, t]);

  const handleContinue = async () => {
    if (!isFirebaseConfigured) {
      setAuthError(t('authMissingConfigTitle'));
      return;
    }
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Anonymous sign-in failed:', error);
      setAuthError(t('authFailed'));
    }
  };

  const handleGoogleContinue = async () => {
    if (!isFirebaseConfigured) {
      setAuthError(t('authMissingConfigTitle'));
      return;
    }
    if (!isGoogleConfigured) {
      setAuthError(t('authGoogleUnavailable'));
      return;
    }
    setAuthError(null);
    try {
      await googleLogin();
    } catch (error) {
      console.error('Google prompt error:', error);
      setAuthError(t('authGoogleFailed'));
    }
  };

  if (!isReady) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: isDark ? colors.dark.background : colors.background }]}>
        <ActivityIndicator color={isDark ? colors.dark.textPrimary : colors.primary} />
      </View>
    );
  }

  if (!isAuthed) {
    return (
      <AuthScreen
        onContinue={handleContinue}
        onGoogleContinue={handleGoogleContinue}
        isConfigMissing={!isFirebaseConfigured}
        isGoogleConfigMissing={!isGoogleConfigured}
        errorMessage={authError}
      />
    );
  }

  return <RootNavigator />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <ThemeProvider>
          <SettingsProvider>
            <AppGate />
          </SettingsProvider>
        </ThemeProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
