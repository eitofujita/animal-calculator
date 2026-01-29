MVPの完成形（最短で黒字化できる形）
無料でできること

ペット登録（まず1匹）

年齢換算（既存資産）

リマインダー：投薬/ワクチン/通院 最大3件まで

体重ログ：直近7日だけ

共有カード（年齢結果の画像）

Pro（買い切り：¥1,200推奨）

リマインダー無制限

複数ペット（2匹以上）

体重ログ無制限

広告削除（入れるなら）

最初はサブスクより買い切りの方が早く黒字化しやすいです。

画面設計（最低限6画面）

Home：今日の予定（次の投薬/ワクチン/通院）＋「追加」

Age Calculator：既存（結果に「リマインダー追加」ボタン）

Pet Profile：ペット情報（名前/種/誕生日or年齢/体重）

Reminders：一覧＋追加/編集

Weight Log：体重入力＋グラフ（なくてもOK、一覧だけでも可）

Paywall/Pro：買い切り購入、復元

技術設計（React Native + Firebase前提）
データ（Firestore）

users/{uid}

isPro: boolean（最初はこれだけでOK）

pets/{petId}

ownerUid, name, species, birthday?, ageYears?, createdAt

reminders/{reminderId}

petId, ownerUid, type (MED/VAX/VET), title, note, scheduleType, nextAt, isEnabled

weights/{weightId}

petId, ownerUid, date, value

ログインは最初 匿名認証でOK（導入が楽、後でGoogle/Apple追加できる）。

通知（ここが継続の核）
最初のMVPは「ローカル通知」でOK（Firebase不要）

投薬：毎日/隔日/週◯

ワクチン：単発（次回日）

通院：単発（予約日）

ローカル通知にすると、サーバーコストなしで安定して動きます。
（FCMは“端末に届ける”は得意でも、スケジュール管理は別に必要で最初は重い）

収益化（最小で確実）
Paywallの出し方（嫌われない設計）

リマインダー追加時に制限超え → Paywall

2匹目追加時に Paywall

体重ログ8日目を保存しようとしたら Paywall

価格

¥1,200 買い切り（迷ったらこれ）

将来：¥2,000に上げてもOK（機能増やしてから）


計算機の機能はあくまでサブ機能として作って



アプリの基本的な動きとして

まずログインしていない人は


サインアップまたはログインをするようにする

その後ログインできたらまだペットを登録していないひとはペットを登録する画面
ペットを登録している人は自分で設定したペットの写真がホームで出てくるようにしたいです


その機能は下のバーから選べるようにしたいです

そのほかの配置は相談して決めます


言語はこのままでいいです。しかしDBはFirebaseがいいです。