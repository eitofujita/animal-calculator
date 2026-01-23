# Animal Age Calculator

React Native（Expo）で作った「動物年齢 → 人間年齢換算」アプリです。犬・猫・うさぎに対応しています。

## 特徴

- **動物タイプ対応**: 犬 / 猫 / うさぎ
- **年齢入力が柔軟**: 年のみ、年+月のどちらもOK
- **自動保存**: 最後の入力を端末ローカルに保存して復元
- **入力バリデーション**: 不正な入力を防止（異常値は警告）
- **シンプルなUI**: 余白多めで見やすい1画面構成

## 前提条件

- Node.js（v16以上）
- npm または yarn
- Expo CLI（グローバル or `npx` 経由でOK）
- Android Studio（Androidエミュレータを使う場合）
- Android端末 または エミュレータ

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバー起動

```bash
npx expo start
```

### 3. Androidで起動

- エミュレータで起動する場合: ターミナルで `a` を押す
- 実機で起動する場合: Androidに Expo Go を入れて QR をスキャン

## ディレクトリ構成

```
animal-calculator/
├── App.tsx                 # メインコンポーネント
├── app.json               # Expo設定
├── package.json           # 依存関係
├── tsconfig.json          # TypeScript設定
├── src/
│   ├── domain/           # ドメイン（計算ロジック）
│   │   ├── types.ts      # 型定義
│   │   └── calculations.ts # 換算ロジック
│   ├── components/       # UI部品
│   │   ├── AnimalSelector.tsx
│   │   ├── AgeInput.tsx
│   │   └── ResultCard.tsx
│   └── utils/            # ユーティリティ
│       └── storage.ts     # AsyncStorageヘルパー
└── assets/               # アイコン/スプラッシュ等
```

## 年齢換算式（仮）

### 犬（Dog）
- 1年目 = 人間年齢15歳
- 2年目 = +9（合計24）
- 3年目以降 = +5 / 年

### 猫（Cat）
- 1年目 = 15
- 2年目 = +9（合計24）
- 3年目以降 = +4 / 年

### うさぎ（Rabbit）
- 1年目 = 12
- 2年目 = +6（合計18）
- 3年目以降 = +4 / 年

## Androidビルド（EAS Build）

### 1. EAS CLI をインストール

```bash
npm install -g eas-cli
```

### 2. Expo にログイン

```bash
eas login
```

### 3. EAS Build の設定

```bash
eas build:configure
```

`eas.json` が作成されます（必要ならプロファイルを調整してください）。

### 4. Android APK/AAB をビルド

**APK（テスト用）**
```bash
eas build --platform android --profile preview
```

**AAB（Google Play 提出用）**
```bash
eas build --platform android --profile production
```

### 5. ダウンロードしてインストール

ビルド完了後にダウンロードリンクが表示されます。APK/AAB をダウンロードして端末にインストール（または Play Console にアップロード）してください。

## Expo設定（app.json）

アプリ設定は `app.json` にあります:
- **Name**: Animal Age Calculator
- **Package**: com.animalcalculator.app
- **Version**: 1.0.0

### アイコン / スプラッシュ画像の追加

`assets/` ディレクトリに以下を配置してください:

1. **icon.png**（1024x1024）- アプリアイコン
2. **splash.png**（1284x2778）- スプラッシュ画像
3. **adaptive-icon.png**（1024x1024）- Android用アダプティブアイコン
4. **favicon.png**（48x48）- Web用（任意）

生成ツール例:
- [Expo Asset Generator](https://www.npmjs.com/package/@expo/asset-generator)
- [App Icon Generator](https://www.appicon.co/)

手動で作成して `assets/` に置くだけでもOKです。

## 開発（Android）

### Androidエミュレータで動かす

1. Android Studio を起動
2. AVD Manager を開く
3. エミュレータを起動
4. `npx expo start` を実行し、ターミナルで `a` を押す

### 実機で動かす

1. Google Play から Expo Go をインストール
2. `npx expo start` を実行
3. 表示された QR を Expo Go でスキャン

## 動作確認チェックリスト

- [ ] 動物タイプを切り替えできる（Dog / Cat / Rabbit）
- [ ] 年のみ入力で計算できる
- [ ] 月あり入力で計算できる
- [ ] 年のみ / 年+月 の切り替えができる
- [ ] バリデーション（負数、月>11）が効く
- [ ] 境界値（0年0ヶ月、30年超の警告）を確認
- [ ] 計算結果が期待通り
- [ ] Reset が入力/保存データをクリアする
- [ ] 再起動後に最後の入力が復元される
- [ ] Android端末/エミュレータで動作する

## トラブルシューティング

### Metro（開発サーバー）のキャッシュ問題

```bash
npx expo start --clear
```

### Androidビルド周りの問題

- Android Studio / SDK が正しく入っているか確認
- `ANDROID_HOME` が正しいか確認
- `eas build --platform android --clear-cache` を試す

## ライセンス

MIT
