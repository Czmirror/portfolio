// src/components/Portfolio.jsx
import React, { useEffect, useState, useRef } from 'react';
import GameSection from './GameSection';
// 例: portfolioData.json に各ゲームのデータが入っているとする
import portfolioData from '../data/portfolioData.json';

const Portfolio = () => {
    const [games, setGames] = useState([]);
    const portfolioRef = useRef(null);

    useEffect(() => {
        // JSONデータからゲーム情報をセットする
        setGames(portfolioData);
    }, []);

    useEffect(() => {
        // Intersection Observer を設定（threshold を 0.1 に変更）
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // 一度 visible を付与したら監視を解除する
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 } // 要素が10%表示されたら
        );

        // portfolioRef 内の全ての .slide-in 要素を監視
        const slideElements = portfolioRef.current.querySelectorAll('.slide-in');
        slideElements.forEach(el => observer.observe(el));

        // クリーンアップ
        return () => {
            slideElements.forEach(el => observer.unobserve(el));
        };
    }, [games]); // games が更新された後に実行

    return (
        <div ref={portfolioRef}>
            {games.map((game) => (
                <GameSection
                    key={game.id}
                    sectionId={game.sectionId}
                    title={game.title}
                    about={game.about}
                    platform={game.platform}
                    demoLinks={game.demoLinks}
                    youtubeEmbed={game.youtubeEmbed}
                    soundcloudEmbed={game.soundcloudEmbed}
                    imageSrc={game.imageSrc}
                    screenshots={game.screenshots}
                />
            ))}
        </div>
    );
};

export default Portfolio;
