# Animal Age Calculator - Complete Setup Guide

## Quick Start Steps

### 1. Initialize Project (if starting fresh)

```bash
# Navigate to project directory
cd animal-calculator

# Install dependencies
npm install
```

### 2. Add App Assets

Before running the app, you need to add icon and splash screen assets to the `assets/` folder:

- **icon.png** - 1024x1024 pixels (app icon)
- **splash.png** - 1284x2778 pixels (splash screen)
- **adaptive-icon.png** - 1024x1024 pixels (Android adaptive icon)
- **favicon.png** - 48x48 pixels (web favicon)

You can use placeholder images for development, or generate them using:
- [Expo Asset Generator](https://www.npmjs.com/package/@expo/asset-generator)
- Online tools like [AppIcon.co](https://www.appicon.co/)

### 3. Start Development Server

```bash
npx expo start
```

### 4. Run on Android

**Option A: Android Emulator**
1. Open Android Studio
2. Start an Android Virtual Device (AVD)
3. In the Expo terminal, press `a` to launch on Android

**Option B: Physical Device**
1. Install "Expo Go" from Google Play Store
2. Scan the QR code shown in the terminal
3. The app will load on your device

## Project Structure

```
animal-calculator/
├── App.tsx                    # Main application entry point
├── app.json                   # Expo app configuration
├── package.json               # Node.js dependencies
├── tsconfig.json             # TypeScript configuration
├── babel.config.js           # Babel configuration
├── eas.json                  # EAS Build configuration
├── .gitignore               # Git ignore rules
├── README.md                # Project documentation
├── SETUP_GUIDE.md           # This file
├── assets/                  # App icons and images
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon.png
│   └── favicon.png
└── src/
    ├── domain/              # Business logic layer
    │   ├── types.ts        # TypeScript type definitions
    │   └── calculations.ts # Age conversion algorithms
    ├── components/          # React components
    │   ├── AnimalSelector.tsx
    │   ├── AgeInput.tsx
    │   └── ResultCard.tsx
    └── utils/              # Utility functions
        └── storage.ts      # AsyncStorage helpers
```

## Building Android APK/AAB with EAS Build

### Prerequisites

1. **Expo Account**: Sign up at [expo.dev](https://expo.dev)
2. **EAS CLI**: Install globally
   ```bash
   npm install -g eas-cli
   ```

### Build Steps

1. **Login to Expo**
   ```bash
   eas login
   ```

2. **Configure EAS Build** (already done - `eas.json` exists)
   ```bash
   eas build:configure
   ```

3. **Build APK (for testing)**
   ```bash
   eas build --platform android --profile preview
   ```
   This creates an APK file that can be installed directly on Android devices.

4. **Build AAB (for Google Play Store)**
   ```bash
   eas build --platform android --profile production
   ```
   This creates an Android App Bundle (AAB) required for Play Store submission.

5. **Download Build**
   - After build completes, you'll receive a download link
   - Download the APK/AAB file
   - For APK: Install directly on Android device
   - For AAB: Upload to Google Play Console

### Build Profiles Explained

- **preview**: Creates APK for testing (no signing required)
- **production**: Creates AAB for Play Store (requires signing)

## Testing Checklist

### Basic Functionality
- [ ] App launches without errors
- [ ] Animal selector works (Dog, Cat, Rabbit)
- [ ] Age input accepts years
- [ ] Age input accepts months (0-11)
- [ ] Toggle between years-only and years+months works
- [ ] Calculate button performs calculation
- [ ] Results display correctly
- [ ] Reset button clears all inputs

### Validation
- [ ] Negative values show error
- [ ] Months > 11 show error
- [ ] Empty input (0 years, 0 months) shows error
- [ ] Age > 30 years shows warning but still calculates

### Data Persistence
- [ ] Last animal type is saved
- [ ] Last age input is saved
- [ ] Data is restored on app restart
- [ ] Reset clears saved data

### Edge Cases
- [ ] 0 years, 0 months (should show error)
- [ ] 0 years, 6 months (should calculate)
- [ ] 1 year, 0 months (should calculate)
- [ ] 30+ years (should show warning)

## Troubleshooting

### Metro Bundler Issues
```bash
# Clear cache and restart
npx expo start --clear
```

### Android Build Fails
```bash
# Clear EAS build cache
eas build --platform android --clear-cache
```

### TypeScript Errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### AsyncStorage Not Working
- Ensure `@react-native-async-storage/async-storage` is installed
- Check that it's imported correctly in `src/utils/storage.ts`

## Development Tips

1. **Hot Reload**: Changes are automatically reflected (shake device to open dev menu)
2. **Debugging**: Use React Native Debugger or Chrome DevTools
3. **Logs**: Check Metro bundler terminal for console logs
4. **Performance**: Use React DevTools Profiler for performance analysis

## Next Steps

After testing:
1. Add app icons and splash screens to `assets/` folder
2. Update `app.json` with your app details
3. Build APK for testing: `eas build --platform android --profile preview`
4. Test APK on multiple Android devices
5. Build AAB for release: `eas build --platform android --profile production`
6. Submit to Google Play Store

## Support

For issues:
- Check [Expo Documentation](https://docs.expo.dev)
- Check [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- Review error messages in terminal/logs
