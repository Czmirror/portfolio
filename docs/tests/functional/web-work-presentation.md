# Web制作実績の機能試験

対象: [仕様](../../specs/web-work-presentation.md)。アプリ内ブラウザでPages用buildを確認します。

| ケース | 条件 | 手順と期待結果 | 結果 |
| --- | --- | --- | --- |
| FT1 | AC1・3・5 | 参照画像と同じPC幅で3作品を表示。画像・文字の左右配置と区切り、内容の読みやすさを比較 | 成功 |
| FT2 | AC2・5 | 各「制作の詳細」をクリック・Enter/Spaceで開閉し、既存の説明と全関連リンクを読める | 成功 |
| FT3 | AC1・4 | Webツール・ゲームへ移動し、正しい紹介を表示。作品のリンクと媒体パスが旧版と一致 | 成功 |
| FT4 | AC4・5 | 390pxで画像→説明の1列、横はみ出しなし。途中リロードでも本文と詳細操作が残る | 成功 |
| FT5 | AC6 | 自己紹介の図と代替テキストを確認。390pxで欠けず、原寸画像を開ける | 成功 |

2026-11-02、アプリ内ブラウザで実施。3作品のEnter/Space開閉、リンク先属性、両カテゴリのhash移動、390pxで詳細を開いた状態の横幅390px、途中リロード後のopacity=1・3作品表示を確認。図解は1536×1024pxの原寸画像が別タブで開くことを確認。console errorなし。

証拠: `/private/tmp/editorial-desktop-final.png`、`/private/tmp/editorial-mobile.jpg`、`/private/tmp/strengths-mobile.jpg`、`/private/tmp/strengths-desktop-final.jpg`。作品リンク先サービス内部の操作は対象外。
