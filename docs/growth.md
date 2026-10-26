# ポートフォリオへの流入を増やす運用

最初に既存のプロフィール・関連記事から作品一覧へ誘導し、流入元ごとの訪問と作品・相談のクリックを比較する。計測仕様は [analytics.md](specs/analytics.md) を参照する。

## 貼り付け用リンク

`utm_source` は掲載先、`utm_medium` は流入の種類、`utm_campaign` は施策名。内部リンクへは付けない。氏名・メール等を値に含めない。作品を紹介する記事からは `#portfolio` へ直接移動する。

| 掲載先 | 使用するURL |
| --- | --- |
| Zennプロフィール | https://czmirror.github.io/portfolio/?utm_source=zenn&utm_medium=referral&utm_campaign=profile |
| Zenn関連記事末尾 | https://czmirror.github.io/portfolio/?utm_source=zenn&utm_medium=referral&utm_campaign=related_article#portfolio |
| note関連記事末尾 | https://czmirror.github.io/portfolio/?utm_source=note&utm_medium=referral&utm_campaign=related_article#portfolio |
| GitHubプロフィール | https://czmirror.github.io/portfolio/?utm_source=github&utm_medium=referral&utm_campaign=profile |
| unityroomプロフィール | https://czmirror.github.io/portfolio/?utm_source=unityroom&utm_medium=referral&utm_campaign=profile#portfolio |
| LAPRASプロフィール | https://czmirror.github.io/portfolio/?utm_source=lapras&utm_medium=referral&utm_campaign=profile |

添える文面: 「Webツールや個人制作ゲームを、制作時の工夫・使用技術とともにポートフォリオにまとめています。」

## 公開ページの確認結果（2026-10-27）

- Zennプロフィールの「あなたのウェブサイト」をunityroomから上記のポートフォリオURLへ変更済み。公開プロフィールでURL反映を確認した。自己紹介・GitHub・Xは変更していない。
- unityroomプロフィールには既にポートフォリオへのリンクがある。流入元を区別するURLへの差し替え候補とする。
- noteの公開検索結果は古い取得時点のため、現行プロフィールのリンク有無を断定しない。先にPULSE・MimiLabの記事末尾を編集画面で確認する。
- GitHubはプロフィールのWebサイト欄・プロフィールREADMEを確認してから追加する。既存の紹介文や他サイトのリンクを置き換えない。
- Zenn以外のプロフィール・記事の公開編集は未実施。上のURLは貼り付け準備済み。

## Search Console

現在ログインしているアカウントでは、対象 `https://czmirror.github.io/portfolio/` に「このプロパティへのアクセス権がありません」と表示された。未登録か別アカウント管理かは確定していない。
所有権を確認できるアカウントで開く。登録が必要ならURLプレフィックスを対象にし、既存GAタグでの確認可否を確認する。今回、登録・権限変更・検証ファイル追加は行っていない。

アクセスできたら、URL検査で公開URLとGoogle選択の正規URLを確認し、「検索パフォーマンス」で直近28日と前28日の表示回数・クリック・クエリを比較する。GAの訪問数だけから未登録・検索順位・表示回数を推定しない。

## 公開後の確認

1. GAリアルタイムで作品・相談リンクのイベント到着を確認する。動作確認の訪問日時を控え、評価時に考慮する。
2. 必要に応じ、GA管理画面でイベントスコープのカスタムディメンション `item_id`・`link_type`・`placement` を登録して内訳を読めるようにする。今回は管理画面を変更していない。
3. 4週間後、ホスト名 `czmirror.github.io` を条件に訪問数と参照元/メディア・キャンペーンを比較する。開発ローカル分と自分の確認訪問を区別する。
4. キーイベント化をする場合も、`contact_click` は「問い合わせへの関心」として扱い、問い合わせ成立数と分ける。Googleフォーム内の送信完了は今回計測しない。

最初の比較では改善率だけでなく実数を使う。母数が少ない間は、率の変動でデザインの良否を断定しない。
