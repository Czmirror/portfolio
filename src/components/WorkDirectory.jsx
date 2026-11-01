// Portfolioの固定掲載データを受け取り、各紹介欄へ移動する作品ガイドを表示します。
// アンカーはPortfolioから渡された値を使い、状態の保持や外部通信は行いません。
import React from 'react';

/** Web作品・ゲーム・共同制作の紹介先から、同一ページ内の目次を表示します。 */
const WorkDirectory = ({ webWorks, games, collaboration }) => {
    const groups = [
        {
            title: 'Webツール',
            description: '制作に役立つツールや、ブラウザで楽しめるコンテンツ。',
            items: webWorks.map(work => ({ title: work.title, anchor: `work-${work.analyticsId}` })),
        },
        {
            title: 'ゲーム',
            description: '個人制作したゲームの概要やプレイ先を紹介しています。',
            items: games.map(game => ({ title: game.title, anchor: game.sectionId })),
        },
        {
            title: 'BGMを聴く',
            description: '自作ゲームのために制作した2曲を試聴できます。',
            items: games.filter(game => game.soundcloudEmbed).map(game => ({
                title: game.soundcloudTitle,
                anchor: `${game.sectionId}-music`,
            })),
        },
        {
            title: 'コラボレーション',
            description: 'ほかの作者の作品で担当した実装を紹介しています。',
            items: [{ title: collaboration.title, anchor: collaboration.sectionId }],
        },
    ];

    return (
        <nav className="work-directory" aria-labelledby="work-directory-title">
            <div className="work-directory-heading">
                <h3 id="work-directory-title" className="title is-4 card-title">作品ガイド</h3>
                <p>気になる作品を選ぶと、このページ内の紹介へ移動します。</p>
            </div>
            <div className="work-directory-grid">
                {groups.map(group => (
                    <div className="work-directory-group" key={group.title}>
                        <h4>{group.title}</h4>
                        <p>{group.description}</p>
                        <ul>
                            {group.items.map(item => (
                                <li key={item.anchor}>
                                    <a href={`#${item.anchor}`}>
                                        <span>{item.title}</span>
                                        <span className="work-directory-arrow" aria-hidden="true">↓</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default WorkDirectory;
