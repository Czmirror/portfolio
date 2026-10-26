# 既知の問題

- 2026-10-26: src/hooks/useLazyLoad.jsx、useLazyIframe.jsxはIntersectionObserver非対応時の代替表示がなく、useLazyLoad.jsxはsrc変更時の読み込み状態を保持する。今回の静的表示整理では変更していない。媒体の寿命管理を別途検討する。
- 2026-10-26: vite buildでCJS Node API非推奨とindex.htmlの非module animations.jsの警告が出る。既存構成の変更は今回の対象外。
