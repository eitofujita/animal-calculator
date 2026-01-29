import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase/firebase';

WebBrowser.maybeCompleteAuthSession();

// React Native 環境でも型エラーにならない env アクセス
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

export function useGoogleLogin() {
  // Expo Go 用: expoClientId = Web クライアントID
  // Android 実機 / dev build 用: androidClientId = Android クライアントID
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    scopes: ['profile', 'email'],
  } as any);

  const login = async () => {
    // Expo Go では useProxy デフォルトで OK
    const res = await promptAsync();
    console.log('promptAsync result', res);
  };

  const handle = async () => {
    if (response?.type !== 'success') return;

    const { id_token } = (response.params ?? {}) as any;
    if (!id_token) {
      console.log('missing id_token', response?.params);
      return;
    }

    const cred = GoogleAuthProvider.credential(id_token);
    await signInWithCredential(auth, cred);
  };

  return { request, response, login, handle };
}
