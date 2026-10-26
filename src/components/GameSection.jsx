// Portfolioから渡された作品情報を表示します。メディアの相対URLはデータの値をそのまま使用します。
import React, { useState } from 'react';
import { LazyImage, LazyVideo } from '../hooks/useLazyLoad.jsx';
import { LazyIframe } from '../hooks/useLazyIframe.jsx';

const GameSection = ({
                         analyticsId,
                         sectionId,
                         title,
                         about,
                         platform,
                         demoLinks,
                         youtubeEmbed,
                         soundcloudEmbed,
                         imageSrc,
                         screenshots,
                         story,
                         characters,
                     }) => {
    // screenshots 配列が存在すれば最初のメディアを、なければ imageSrc を初期値にする
    const [currentMedia, setCurrentMedia] = useState(
        screenshots && screenshots.length > 0 ? screenshots[0] : { type: "image", src: imageSrc }
    );

    return (
        <section id={sectionId} className="section portfolio slide-in store-section" data-analytics-work={analyticsId}>
            <div className="container">
                <div className="store-card card">
                    <h3 className="title is-3 has-text-centered card-title">{title}</h3>
                    <div className="columns">
                        {/* 左カラム：メインメディアとサムネイル */}
                        <div className="column is-half">
                            <div className="main-media-container">
                                {currentMedia.type === "video" ? (
                                    <LazyVideo 
                                        src={currentMedia.src}
                                        controls 
                                        disablePictureInPicture 
                                        className="main-media"
                                    />
                                ) : (
                                    <LazyImage 
                                        src={currentMedia.src}
                                        alt={`${title}のメイン画像`}
                                        className="main-media" 
                                    />
                                )}
                            </div>
                            {screenshots && screenshots.length > 1 && (
                                <div className="thumbnails">
                                    {screenshots.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`thumbnail-wrapper ${currentMedia.src === item.src ? 'active' : ''}`}
                                            onClick={() => setCurrentMedia(item)}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter' || event.key === ' ') {
                                                    event.preventDefault();
                                                    setCurrentMedia(item);
                                                }
                                            }}
                                            role="button"
                                            tabIndex="0"
                                            aria-label={`${title}の表示メディアを${index + 1}番目に切り替える`}
                                        >
                                            {item.type === "video" ? (
                                                <LazyVideo 
                                                    src={item.src}
                                                    muted 
                                                    disablePictureInPicture 
                                                    className="thumbnail" 
                                                    preload="metadata"
                                                />
                                            ) : (
                                                <LazyImage 
                                                    src={item.src}
                                                    alt={`${title}のサムネイル ${index + 1}`}
                                                    className="thumbnail" 
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* 右カラム：ゲーム概要 */}
                        <div className="column is-half">
                            <div className="game-overview">
                                <h4 className="title is-4 card-subtitle mt0">作品概要</h4>
                                <p className="about-content is-size-7" dangerouslySetInnerHTML={{ __html: about }}></p>
                                {platform && (
                                    <>
                                        <h4 className="title is-4 card-subtitle extra-margin">対応プラットフォーム</h4>
                                        <p className="about-content is-size-7" dangerouslySetInnerHTML={{ __html: platform }}></p>
                                    </>
                                )}
                                {demoLinks && demoLinks.length > 0 && (
                                    <>
                                        <h4 className="title is-4 card-subtitle extra-margin">デモ・関連リンク</h4>
                                        <ul className="is-size-7">
                                            {demoLinks.map((link) => (
                                                <li key={link.url}>
                                                    <a href={link.url} className="store-link" target="_blank" rel="noopener noreferrer">{link.text}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {story && (
                                    <>
                                        <h4 className="title is-4 card-subtitle extra-margin">ストーリー</h4>
                                        <p className="about-content is-size-7" dangerouslySetInnerHTML={{ __html: story }}></p>
                                    </>
                                )}
                                {characters && (
                                    <>
                                        <h4 className="title is-4 card-subtitle extra-margin">キャラクター</h4>
                                        <p className="about-content is-size-7" dangerouslySetInnerHTML={{ __html: characters }}></p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* YouTube 動画埋め込み */}
                    {youtubeEmbed && (
                        <div className="columns is-marginless">
                            <div className="column">
                                <h4 className="title is-4 card-subtitle extra-margin">ゲームプレイ動画</h4>
                                <div className="video-container">
                                    <LazyIframe
                                        src={youtubeEmbed}
                                        width="100%"
                                        height="615"
                                        frameBorder="0"
                                        allowFullScreen
                                        title={`${title} ゲームプレイ動画`}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {/* SoundCloud プレイヤー埋め込み */}
                    {soundcloudEmbed && (
                        <div className="columns is-marginless">
                            <div className="column">
                                <h4 className="title is-4 card-subtitle extra-margin">SoundCloudプレイヤー</h4>
                                <LazyIframe
                                    src={soundcloudEmbed}
                                    width="100%"
                                    height="450"
                                    scrolling="no"
                                    frameBorder="no"
                                    allow="autoplay"
                                    title={`${title} SoundCloudプレイヤー`}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GameSection;
