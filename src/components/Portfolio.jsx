// src/components/Portfolio.jsx
import React, { useEffect, useState, useRef } from 'react';
import GameSection from './GameSection';
import portfolioData from '../data/portfolioData.json';

const consultationItems = [
    'LINEからイベント参加者を募集・管理したい',
    '紙やExcelで行っている集計を簡単にしたい',
    '毎回手作業で送っている案内を減らしたい',
    '申込フォームや小規模なWebページを用意したい',
    '既存サービスで解決できるか相談したい',
    '作りたいものはあるが、何から決めればよいか分からない',
];

const supportFlow = [
    {
        title: '初回相談',
        description: '困っていること、実現したいこと、利用者、希望時期を確認します。',
    },
    {
        title: '方法の整理',
        description: '既存サービスで解決できるか、専用の制作が必要かを整理します。',
    },
    {
        title: '対応範囲と金額の確認',
        description: '実作業へ進む前に、作るもの、対応範囲、概算金額を提示します。',
    },
    {
        title: '制作・設定',
        description: '合意した範囲に沿って、制作または設定を進めます。',
    },
    {
        title: '確認・引き渡し',
        description: '動作を確認し、必要な説明とともに引き渡します。',
    },
];

const priceGuides = [
    {
        item: '初回相談',
        price: '無料・30分程度',
        scope: '困りごとの確認と実現方法の整理',
    },
    {
        item: '調査・提案',
        price: '5,000円〜',
        scope: 'サービス選定、簡単な構成案、作業範囲の整理',
    },
    {
        item: '小規模な設定・修正',
        price: '10,000円〜',
        scope: 'フォーム設定、軽微なページ修正、既存サービスの設定',
    },
    {
        item: '試作品の制作',
        price: '50,000円〜',
        scope: '動作確認を目的とした小規模なWeb試作',
    },
    {
        item: 'Webシステム開発',
        price: '個別見積もり',
        scope: '要件、認証、管理画面、外部連携などを確認',
    },
    {
        item: '継続的な保守・改善',
        price: '個別見積もり',
        scope: '月ごとの作業上限と対応範囲を決定',
    },
];

const webWorks = [
    {
        title: 'UINya',
        imageSrc: './assets/image/portfolio/web/uinya.png',
        imageAlt: 'UINyaのUI素材エディタ画面',
        summary: '猫モチーフのゲームUI素材を作成できるSVGジェネレーターです。',
        overview: 'ゲーム制作で使うボタン、フレーム、ゲージ、テキストボックスなどを、猫モチーフで作れるツールです。',
        features: 'テンプレート選択、図形・テキスト追加、グループ化、前後関係の変更、SVG/PNG出力、保存・読み込みなどを実装しています。',
        notes: '猫耳フレーム、肉球ボタン、しっぽ型ゲージなど、ゲームUIとして使いやすいモチーフをテンプレート化しています。',
        technologies: ['SVG', 'Canvas/UI Editor', 'GitHub Pages'],
        links: [
            { text: 'UINyaを開く', url: 'https://czmirror.github.io/UInya/' },
        ],
    },
    {
        title: 'MimiLab',
        imageSrc: './assets/image/portfolio/web/mimilab.png',
        imageAlt: 'MimiLabの音楽キー・BPM解析ページ',
        summary: '音声ファイルや動画URLからキー、スケール、BPMなどを解析する耳コピ補助アプリです。',
        overview: '耳コピの前段階で知りたい曲のキー、スケール、BPM、ダイアトニックコードを確認するために作ったアプリです。',
        features: '音声入力、AI解析、キー・スケール・BPM・ダイアトニックコード表示、GitHub Pagesの紹介ページ、配布導線を整備しています。',
        notes: 'Essentia.jsやTonal.jsなど、音声解析と音楽理論の既存ライブラリを組み合わせて、耳コピに必要な情報を一画面にまとめています。',
        technologies: ['Electron', 'Essentia.js', 'Tonal.js', 'yt-dlp', 'ffmpeg'],
        links: [
            { text: 'MimiLabを開く', url: 'https://czmirror.github.io/MimiLab/' },
            { text: '制作記事を読む', url: 'https://note.com/cz_mirror/n/nc1e6d04f73ad' },
        ],
    },
    {
        title: 'PULSE',
        imageSrc: './assets/image/portfolio/web/pulse.png',
        imageAlt: 'PULSEのブラウザリズムゲーム画面',
        summary: 'Rust製ゲームエンジンBevyをWASMで動かした、ブラウザで遊べるリズムゲームです。',
        overview: '中央のリングに向かって縮むパルス波に合わせてクリックまたはタップする、30秒のシンプルなリズムゲームです。',
        features: 'Bevy 0.15をWASM向けにビルドし、GitHub ActionsとGitHub Pagesで公開。Web Audio API、初回操作時のAudioContext再開、音量設定の保存に対応しています。',
        notes: 'ブラウザのオートプレイ制限やWebGL2/WebGPU対応を考慮し、起動できない環境では理由が分かる表示へ切り替える構成にしています。',
        technologies: ['Rust', 'Bevy', 'WebAssembly', 'Web Audio API', 'GitHub Pages'],
        links: [
            { text: 'PULSEを開く', url: 'https://czmirror.github.io/Pulse/' },
            { text: '制作記事を読む', url: 'https://note.com/cz_mirror/n/n75a420ff32df' },
        ],
    },
];

const Portfolio = () => {
    const [games, setGames] = useState([]);
    const portfolioRef = useRef(null);

    useEffect(() => {
        // JSONデータからゲーム情報をセットする
        setGames(portfolioData);
    }, []);

    useEffect(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!portfolioRef.current || isReducedMotion || !('IntersectionObserver' in window)) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const slideElements = portfolioRef.current.querySelectorAll('.slide-in');
        slideElements.forEach(el => observer.observe(el));

        return () => {
            slideElements.forEach(el => observer.unobserve(el));
        };
    }, [games]);

    return (
        <div ref={portfolioRef}>
            <section id="consultation" className="section slide-in store-section service-section">
                <div className="container">
                    <h2 className="title store-title">Webについて相談できること</h2>
                    <div className="store-card service-card">
                        <p className="service-lead">
                            WebサイトやLINEを使った連絡の仕組み、フォーム、集計、手作業の整理など、身近な困りごとから相談できます。
                        </p>
                        <div className="columns is-multiline">
                            {consultationItems.map((item) => (
                                <div className="column is-half" key={item}>
                                    <div className="support-item">{item}</div>
                                </div>
                            ))}
                        </div>
                        <p className="service-note">
                            ご相談内容を伺ったうえで、既存サービスで解決できる場合は、その方法も含めて提案します。必ず専用システムの開発を勧めるものではありません。
                        </p>
                    </div>
                </div>
            </section>

            <section id="support-flow" className="section slide-in store-section">
                <div className="container">
                    <h2 className="title store-title">相談から対応までの流れ</h2>
                    <div className="flow-list">
                        {supportFlow.map((step, index) => (
                            <article className="flow-item" key={step.title}>
                                <div className="flow-number">{index + 1}</div>
                                <div>
                                    <h3 className="title is-5 card-title">{step.title}</h3>
                                    <p className="about-content is-size-7">{step.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                    <p className="service-note mt-4">
                        継続的な保守、追加修正、緊急対応は自動的には含まれません。必要な場合は、対応範囲と作業上限を確認したうえで別途ご相談となります。
                    </p>
                </div>
            </section>

            <section id="price-guide" className="section slide-in store-section">
                <div className="container">
                    <h2 className="title store-title">料金の目安</h2>
                    <div className="table-scroll-hint">横にスクロールして確認できます</div>
                    <div className="price-table-wrap" tabIndex="0" aria-label="料金の目安表">
                        <table className="table price-table is-fullwidth">
                            <thead>
                            <tr>
                                <th>内容</th>
                                <th>料金の目安</th>
                                <th>対応範囲</th>
                            </tr>
                            </thead>
                            <tbody>
                            {priceGuides.map((guide) => (
                                <tr key={guide.item}>
                                    <td>{guide.item}</td>
                                    <td className="price-cell">{guide.price}</td>
                                    <td>{guide.scope}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="service-note">
                        表示料金は目安です。作業内容を確認したうえで、対応範囲と金額をご案内します。サーバー、ドメイン、外部サービスなどの利用料は含みません。仕様追加や納品後の修正、継続的な運用対応は別途ご相談となります。即日・緊急対応は原則として行っていません。
                    </p>
                </div>
            </section>

            <section id="portfolio" className="section slide-in store-section">
                <div className="container">
                    <h2 className="title store-title">制作実績</h2>
                    <div className="store-card">
                        <h3 className="title is-4 card-title">Web制作物・ツール</h3>
                        <p className="about-content is-size-7">
                            個人制作として公開しているWebツールやブラウザ向けコンテンツです。
                        </p>
                        <div className="web-work-list">
                            {webWorks.map((work) => (
                                <article className="web-work-card" key={work.title}>
                                    <div className="web-work-layout">
                                        <figure className="web-work-media">
                                            <img src={work.imageSrc} alt={work.imageAlt} loading="lazy" />
                                        </figure>
                                        <div className="web-work-overview">
                                            <h4 className="title is-5 card-title">{work.title}</h4>
                                            <p className="about-content is-size-7 web-work-summary">{work.summary}</p>
                                        </div>
                                    </div>
                                    <dl className="case-format">
                                        <div><dt>概要</dt><dd>{work.overview}</dd></div>
                                        <div><dt>主な機能</dt><dd>{work.features}</dd></div>
                                        <div><dt>工夫したこと</dt><dd>{work.notes}</dd></div>
                                        <div>
                                            <dt>使用技術</dt>
                                            <dd>
                                                <div className="tags">
                                                    {work.technologies.map((technology) => (
                                                        <span className="tag is-info" key={technology}>#{technology}</span>
                                                    ))}
                                                </div>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt>関連リンク</dt>
                                            <dd>
                                                <ul className="is-size-7">
                                                    {work.links.map((link) => (
                                                        <li key={link.url}>
                                                            <a href={link.url} className="store-link" target="_blank" rel="noopener noreferrer">{link.text}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </dd>
                                        </div>
                                    </dl>
                                </article>
                            ))}
                        </div>
                    </div>
                    <h3 className="title store-title game-works-title">ゲーム制作実績</h3>
                </div>
            </section>

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
                    story={game.story}
                    characters={game.characters}
                />
            ))}
        </div>
    );
};

export default Portfolio;
