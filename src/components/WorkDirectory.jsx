// Portfolioから読み込み、Web作品とゲームの紹介へ移動するページ内リンクを表示します。
import React from 'react';

/** 内容を切り替えず、2つの紹介先へ移動するタブ風の案内です。 */
const WorkDirectory = () => (
    <nav className="work-directory" aria-label="制作実績のカテゴリ">
        <a href="#web-works">Web作品</a>
        <a href="#game-works">ゲーム</a>
    </nav>
);

export default WorkDirectory;
