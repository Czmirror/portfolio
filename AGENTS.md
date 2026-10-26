# Portfolio — Agent entry point

このプロジェクトは共通ハーネスを `.harness/upstream/` のGitサブモジュールとして参照します。
共通ルールの正本はその `rules/` です。サブモジュール内を直接編集しません。

## 作業開始時

1. 作業ディレクトリと `git status` を確認し、既存の変更を保護する。
2. `.harness/upstream/rules/core/safety.md`、`workflow.md`、`quality.md` を読む。
3. `.harness/upstream/rules/index.md` に従い、作業内容に関係する追加ルールを読む。
   Git操作では `rules/core/git.md`、HTML・CSS・ブラウザJavaScriptでは `rules/stacks/web.md` を適用する。
4. 要求・影響範囲・計画・検証方法を提示し、同じ範囲の既存承認を確認してから実装する。
5. 変更後は検証と差分レビューを行い、共通の `templates/completion.md` に沿って結果と未検証事項を報告する。

ルールは1ファイルずつ全文を読む。URLが通常の方法で読めない場合はJinaを使う。
非公開URLや秘密情報を第三者へ送らず、外部送信には共通のSafetyを適用する。

## Project固有ルール

- 方針: 公開ポートフォリオ。既存の掲載内容・レイアウト・画像と動画の相対パスを保ち、変更範囲を絞る。
- 言語: 会話・文書・コードコメントは日本語を基本とする。commitメッセージは既存の英語表記に合わせる。
- 技術: React 18、Vite 5、JavaScript / JSX、HTML、CSS、npm。Node.jsは既存のGitHub Actions設定も確認する。
- 案件情報: 業務経験、個人制作物、相談案内を紹介する。ゲームの作り直し・作品追加は別の作業として扱う。
- 構成: `index.html` は静的なページ構成、`src/` はReact表示と掲載データ、`public/assets/` は公開素材、`game/` は別管理のゲーム実装。
- Firebaseは廃止済み。お知らせは `src/data/whats_new.json` が正本。Firebaseの再導入は別の計画にする。
- 既知の問題は `docs/known-issues.md`、作業の記録は `docs/work/`、単体試験の記録は `docs/tests/unit/` を参照する。
- ユーザーの変更を自分のcommitへ混ぜない。変更のまとまりごとにcommitし、push・PR・公開はその作業への承認を確認する。
- `.claude/settings.local.json` は個人のローカル設定。実行許可は計画承認やハーネスの免除を意味しない。許可設定やhookを無断で拡張・上書きしない。

## 検証コマンド

```sh
node --test tests/animations.test.cjs
GITHUB_PAGES=1 npm run build
git diff --check
```

lint・型検査のコマンドと `.harness/project.json` は未設定です。
Harness RunnerやGuard hookを導入済みとは扱わず、必要なら別の計画で設定します。
Claude Codeは `CLAUDE.md` からこの共通入口を読みます。新規セッションでの自動読込・ルール遵守は別途確認する事項です。
