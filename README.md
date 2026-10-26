# Cz_mirror Portfolio

Cz_mirrorのポートフォリオサイトです。
Web系エンジニアとしての活動、身近なWeb相談への対応方針、個人ゲーム制作で作ったゲームや素材などを紹介しています。

**公開サイト:** https://czmirror.github.io/portfolio/

## 掲載内容

- 自己紹介、Webバックエンド開発・運用の経歴、スキル
- Webについて相談できること、対応の流れ、料金の目安
- Web制作物・ツール、個人ゲーム制作の実績と関連リンク
- 更新履歴、お問い合わせフォーム

## 技術構成

React 18 / JavaScript / Vite 5を使用しています。静的なHTMLを土台に、更新履歴と制作実績をReactで描画します。スタイルはBulmaと独自CSSを組み合わせています。

Firebaseは使用していません。更新履歴や掲載作品のデータはリポジトリ内のファイルで管理します。

## ローカル開発

Node.jsとnpmが必要です。実行環境は `package.json`・`package-lock.json` と `.github/workflows/` の設定を確認してください。

```sh
git clone --recurse-submodules git@github.com:Czmirror/portfolio.git
cd portfolio
npm ci --no-audit --no-fund
npm run dev
```

開発サーバーのURLはViteの起動ログに表示されます。`index.html` を `file://` で直接開くと、Reactや画像の読み込みが正しく動作しません。

ハーネスは非公開リポジトリのため、サブモジュールの取得には読み取り権限が必要です。サイトの起動・ビルド自体はサブモジュールなしで実行できます。サイトだけを確認する場合は、`--recurse-submodules` を付けずにcloneしてください。

既にclone済みでハーネスを取得する場合は、権限のある環境で次を実行します。

```sh
git submodule update --init --recursive
```

## ビルドとプレビュー

GitHub Pagesの `/portfolio/` 配下を想定して確認する場合:

```sh
GITHUB_PAGES=1 npm run build
npm run serve -- --host 127.0.0.1 --port 4173 --base /portfolio/
```

確認URLは `http://127.0.0.1:4173/portfolio/` です。出力先は `dist/` です。

通常の相対パスでビルドする場合は `npm run build` を使います。`npm run serve` はビルド済みファイルを配信するため、ソースを変更したら再ビルドしてください。

## ファイル構成

| 場所 | 内容 |
| --- | --- |
| `index.html` | ナビゲーション、自己紹介・スキル、問い合わせなどの静的な構成 |
| `src/index.js` | 更新履歴と制作実績のReact描画の入口 |
| `src/components/` | 更新履歴、制作実績、作品カード |
| `src/hooks/` | 画像・動画・埋め込みの遅延読み込み |
| `src/data/portfolioData.json` | ゲーム作品の掲載データ |
| `src/data/whats_new.json` | 更新履歴 |
| `public/assets/css/styles.css` | サイト共通の装飾・レスポンシブ表示 |
| `public/assets/image/` | 画像・動画・背景。素材の出典は各ディレクトリの台帳を参照 |
| `public/assets/js/animations.js` | 表示アニメーション、ページ内移動、メニュー操作 |
| `game/` | ゲーム実装。現在のViteビルドでは独立した公開ページとして設定していない |
| `tests/` | 表示判定の回帰テスト |
| `docs/` | 既知の問題、作業計画、検証記録 |
| `.harness/upstream/` | 非公開の共通ハーネス（Gitサブモジュール） |

## 掲載内容の更新

- 経歴・スキル・連絡先: `index.html`
- Web制作物の紹介: `src/components/Portfolio.jsx`
- ゲーム作品: `src/data/portfolioData.json`
- 更新履歴: `src/data/whats_new.json` の先頭に、重複しないIDと日付を付けて追加

`public/` の内容はビルド後に公開ルートへコピーされます。例えば `public/assets/image/example.png` は、ページから `./assets/image/example.png` として参照します。公開URLに `/public/` を含めないでください。

画像・動画のファイル名や既存の相対パスを変える際は、HTML、CSS、JSON、React内の参照を確認してください。生成背景の出典・利用条件は [背景素材の台帳](public/assets/image/backgrounds/README.md) に記録しています。

## 検証

```sh
node --test tests/animations.test.cjs
GITHUB_PAGES=1 npm run build
git diff --check
```

lint・型検査用のnpmスクリプトは未設定です。ビルドや単体テストに加え、PC・スマホの表示、画像・動画の読み込み、メニュー操作、途中リロードを確認します。

既存の警告と未対応事項は [既知の問題](docs/known-issues.md) を参照してください。

## 公開

`main` へのpushで `.github/workflows/` のGitHub Pagesワークフローが実行され、`dist/` が公開されます。依存のインストール・ビルド・デプロイは既存ワークフローに従います。

push後はGitHub Actionsの成功だけでなく、公開サイトの表示と更新履歴・素材の反映も確認します。非公開のハーネスはサイトのビルド依存ではなく、現在のデプロイでも取得しません。

## AIとの開発

共通の作業入口は [AGENTS.md](AGENTS.md) です。Claude Code向けの [CLAUDE.md](CLAUDE.md) はこのファイルを読み込み、独自の別ルールを持ちません。

`.claude/settings.local.json` は個人環境用としてGit管理から除外します。開発サーバーの実行許可があっても、ハーネスの計画・操作承認を省略する意味にはなりません。ローカル設定を削除・上書きせず、共有する指示と個人の権限設定を分けて扱います。

ハーネスはルールの参照として利用しています。Harness Runnerの設定やGuard hookによる強制は未導入です。
