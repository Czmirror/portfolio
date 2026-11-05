// src/index.jsから読み込まれ、相談案内と制作実績を静的データから表示します。
import React, { useEffect, useRef } from 'react';
import GameSection from './GameSection';
import WorkDirectory from './WorkDirectory';
import portfolioData from '../data/portfolioData.json';

// ガイドと詳細欄で同じアンカーを使い、すでに公開したIDは維持します。
const games = portfolioData.map(game => ({ ...game, sectionId: game.sectionId || `game-${game.id}` }));
const featuredGameIds = [1, 2, 7];
const featuredGames = featuredGameIds.map(id => games.find(game => game.id === id));
const otherGames = games.filter(game => !featuredGameIds.includes(game.id));
// 掲載許可を確認するまで、コラボレーション欄は描画しません。
const collaboration = { visible: false, title: '犯罪者隔離世界', sectionId: 'collaboration' };

const consultationItems = [
    { title: 'フォーム・小規模サイト', description: '申込フォームや、小規模なWebサイトを用意したい。' },
    { title: 'LINEでの連絡・受付', description: 'LINEで参加者を募集したり、案内を送りやすくしたい。' },
    { title: '集計・手作業の整理', description: '紙やExcelで行っている集計を簡単にしたい。' },
];

const supportFlow = [
    { title: '相談する', description: '困っていることや実現したいことをお聞かせください。' },
    { title: '方法・費用を確認', description: '進め方、対応範囲と概算費用をご案内します。' },
    { title: '制作・引き渡し', description: '合意した範囲で制作・設定し、動作を確認してお渡しします。' },
];

const priceGuides = [
    {
        item: '調査・提案',
        price: '5,000円〜',
        scope: 'サービス選定、簡単な構成案、作業範囲の整理',
    },
    {
        item: '小規模な設定・修正',
        price: '10,000円〜',
        featured: true,
        scope: 'フォーム設定、軽微なページ修正、既存サービスの設定',
    },
    {
        item: '試作品の制作',
        price: '50,000円〜',
        featured: true,
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
        analyticsId: 'uinya',
        imageSrc: './assets/image/portfolio/web/uinya.png',
        imageAlt: 'UINyaのUI素材エディタ画面',
        summary: '猫モチーフのゲームUI素材を作成できるSVGジェネレーターです。',
        caption: 'ボタンやフレーム、ゲージを編集し、SVG・PNGで書き出せます。',
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
        analyticsId: 'mimilab',
        imageSrc: './assets/image/portfolio/web/mimilab.png',
        imageAlt: 'MimiLabの音楽キー・BPM解析ページ',
        summary: '音声ファイルや動画URLからキー、スケール、BPMなどを解析する耳コピ補助アプリです。',
        caption: '曲のキーやBPMを確認し、耳コピの準備に活用できます。',
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
        analyticsId: 'pulse',
        imageSrc: './assets/image/portfolio/web/pulse.png',
        imageAlt: 'PULSEのブラウザリズムゲーム画面',
        summary: 'Rust製ゲームエンジンBevyをWASMで動かした、ブラウザで遊べるリズムゲームです。',
        caption: 'クリックやタップのタイミングを合わせる、30秒のリズムゲームです。',
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
    const portfolioRef = useRef(null);

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
    }, []);

    return (
        <div ref={portfolioRef}>
            <section id="consultation" className="section slide-in store-section">
                <div className="container consultation-layout">
                    <h2 className="title consultation-title">Webのご相談</h2>
                    <p>Webまわりの小さな困りごとから、制作・改善までご相談いただけます。</p>
                    <div className="consultation-columns">
                        <div>
                            <h3>相談例</h3>
                            <dl className="consultation-examples">
                                {consultationItems.map(({ title, description }) => (
                                    <div key={title}>
                                        <dt>{title}</dt>
                                        <dd>{description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <div id="support-flow">
                            <h3>ご相談の流れ</h3>
                            <ol className="consultation-steps">
                                {supportFlow.map(({ title, description }, index) => (
                                    <li key={title}>
                                        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                                        <div>
                                            <h4>{title}</h4>
                                            <p>{description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div className="consultation-footer">
                        <div>
                            <p>既存サービスの活用も含めて提案します。</p>
                            <p className="consultation-scope">継続保守・追加修正・緊急対応は別途ご相談となります。</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="price-guide" className="section slide-in store-section">
                <div className="container pricing-layout">
                    <div className="pricing-columns">
                        <header className="pricing-intro">
                            <h2 className="title">料金の目安</h2>
                            <p className="pricing-free">初回相談は無料</p>
                            <p>30分程度</p>
                        </header>
                        <div>
                            <h3 className="pricing-examples-title">費用の例</h3>
                            <dl className="pricing-examples">
                                {priceGuides.filter((guide) => guide.featured).map(({ item, price }) => (
                                    <div key={item}>
                                        <dt>{item}</dt>
                                        <dd>{price}</dd>
                                    </div>
                                ))}
                            </dl>
                            <p>ご依頼の内容に応じてお見積もりします。</p>
                            <details className="pricing-details">
                                <summary>料金の詳細を見る</summary>
                                <dl className="pricing-full-list">
                                    {priceGuides.map(({ item, price, scope }) => (
                                        <div key={item}>
                                            <dt>{item}</dt>
                                            <dd className="pricing-amount">{price}</dd>
                                            <dd className="pricing-scope">{scope}</dd>
                                        </div>
                                    ))}
                                </dl>
                                <p className="pricing-conditions">
                                    サーバー、ドメイン、外部サービスなどの利用料は含みません。仕様追加や納品後の修正、継続的な運用対応は別途ご相談となります。即日・緊急対応は原則として行っていません。
                                </p>
                            </details>
                        </div>
                    </div>
                    <div className="consultation-footer">
                        <p>内容と費用に合意してから制作に進みます。</p>
                        <a className="consultation-contact" href="#contact">お問い合わせ</a>
                    </div>
                </div>
            </section>

            <section id="portfolio" className="section slide-in store-section">
                <div className="container">
                    <header className="work-section-heading">
                        <h2 className="title store-title">制作実績</h2>
                        <p>個人制作として公開しているWebツールやブラウザで遊べるゲームです。</p>
                    </header>
                    <WorkDirectory />
                    <div id="web-works" className="web-work-list" aria-label="Web制作物・ツール">
                        {webWorks.map((work) => (
                            <article id={`work-${work.analyticsId}`} className="web-work-card" key={work.title} data-analytics-work={work.analyticsId}>
                                <div className="web-work-layout">
                                    <figure className="web-work-media">
                                        <img src={work.imageSrc} alt={work.imageAlt} loading="lazy" width="1280" height="720" />
                                    </figure>
                                    <div className="web-work-overview">
                                        <p className="web-work-category">Web作品</p>
                                        <h3 className="web-work-title">{work.title}</h3>
                                        <p className="web-work-summary">{work.summary}</p>
                                        <p className="web-work-caption">{work.caption}</p>
                                        <a href={work.links[0].url} className="work-primary-link" target="_blank" rel="noopener noreferrer">
                                            {work.links[0].text}
                                        </a>
                                        <details className="web-work-details">
                                            <summary>制作の詳細</summary>
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
                                                        <ul>
                                                            {work.links.map((link) => (
                                                                <li key={link.url}>
                                                                    <a href={link.url} className="store-link" target="_blank" rel="noopener noreferrer">{link.text}</a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </dd>
                                                </div>
                                            </dl>
                                        </details>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                    <h3 id="game-works" className="title store-title game-works-title">ゲーム制作実績</h3>
                    <p className="featured-games-label">代表作</p>
                </div>
            </section>

            {featuredGames.map(game => (
                <GameSection key={game.id} {...game} analyticsId={`game-${game.id}`} />
            ))}

            <section className="section other-games" aria-labelledby="other-games-title">
                <div className="container">
                    <h3 id="other-games-title" className="title">その他のゲーム作品</h3>
                    {otherGames.map(game => (
                        <GameSection key={game.id} {...game} analyticsId={`game-${game.id}`} compact />
                    ))}
                </div>
            </section>

            {collaboration.visible && <section id={collaboration.sectionId} className="section slide-in store-section">
                <div className="container">
                    <h2 className="title store-title">コラボレーション</h2>
                    <article className="store-card collaboration-card">
                        <p className="showcase-label">共同制作への参加</p>
                        <h3 className="title is-4 card-title">{collaboration.title}</h3>
                        <p className="about-content is-size-7">
                            ミニゲームを含むアドベンチャーゲームに、実装担当として参加しました。
                        </p>
                        <dl className="case-format">
                            <div>
                                <dt>担当したこと</dt>
                                <dd>第一話のミニゲーム「ロボットシューティング」の実装</dd>
                            </div>
                            <div>
                                <dt>作品について</dt>
                                <dd>
                                    <a href="https://azami0828gamecreat.wixsite.com/hankaku-hp" className="store-link" target="_blank" rel="noopener noreferrer">
                                        作品公式サイトへ
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </article>
                </div>
            </section>}
        </div>
    );
};

export default Portfolio;
