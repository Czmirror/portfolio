# GA送信モジュールの単体試験

対象: `src/analytics.mjs`。仕様: `docs/specs/analytics.md`。

| 観点 | 対応するtest | 結果 |
| --- | --- | --- |
| 本番URLのみ許可、local/file/別path/偽host/不正値を拒否 | production URL boundary | 成功 |
| 固定作品IDと行き先の分類、未知値・URL拒否 | work link classification | 成功 |
| ナビ・ヒーローの相談/問い合わせリンク分類 | consultation link classification | 成功 |
| 非本番でタグもイベントも登録しない | no local collection | 成功 |
| 本番で一度だけ初期化、後からのリンクのイベント一回送信 | production initialization and delegated clicks | 成功 |
| 計測例外でも標準操作を妨げない | tracking failure preserves navigation | 成功 |

実GAサーバーへの到着は単体試験の対象外。公開後の確認として機能試験に残す。
