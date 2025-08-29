// src/components/GameSection.jsx
import React, { useState } from 'react';
import { LazyImage, LazyVideo } from '../hooks/useLazyLoad.jsx';
import { LazyIframe } from '../hooks/useLazyIframe.jsx';

const GameSection = ({
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

    // 相対パスをそのまま使用（Viteが自動でbase pathを処理）
    const getAssetUrl = (path) => path;

    return (
        <section id={sectionId} className="section portfolio slide-in store-section">
            <div className="container">
                {sectionId && (
                    <h2 className="title store-title">Portfolio</h2>
                )}
                <div className="store-card card">
                    <h3 className="title is-3 has-text-centered card-title">{title}</h3>
                    <div className="columns">
                        {/* 左カラム：メインメディアとサムネイル */}
                        <div className="column is-half">
                            <div className="main-media-container">
                                {currentMedia.type === "video" ? (
                                    <LazyVideo 
                                        src={getAssetUrl(currentMedia.src)} 
                                        controls 
                                        disablePictureInPicture 
                                        className="main-media"
                                    />
                                ) : (
                                    <LazyImage 
                                        src={getAssetUrl(currentMedia.src)} 
                                        alt={`${title} Main Media`} 
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
                                        >
                                            {item.type === "video" ? (
                                                <LazyVideo 
                                                    src={getAssetUrl(item.src)} 
                                                    muted 
                                                    disablePictureInPicture 
                                                    className="thumbnail" 
                                                    preload="metadata"
                                                />
                                            ) : (
                                                <LazyImage 
                                                    src={getAssetUrl(item.src)} 
                                                    alt={`${title} thumbnail ${index + 1}`} 
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
                                <h4 className="title is-4 card-subtitle mt0">About</h4>
                                <p className="about-content is-size-7" dangerouslySetInnerHTML={{ __html: about }}></p>
                                {platform && (
                                    <>
                                        <h4 className="title is-4 card-subtitle extra-margin">Platform</h4>
                                        <p className="about-content is-size-7" dangerouslySetInnerHTML={{ __html: platform }}></p>
                                    </>
                                )}
                                {demoLinks && demoLinks.length > 0 && (
                                    <>
                                        <h4 className="title is-4 card-subtitle extra-margin">Demo</h4>
                                        <ul className="is-size-7">
                                            {demoLinks.map((link) => (
                                                <li key={link.url}>
                                                    <a href={link.url} className="store-link" target="_blank">{link.text}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {story && (
                                    <>
                                        <h4 className="title is-4 card-subtitle extra-margin">Story</h4>
                                        <p className="about-content is-size-7" dangerouslySetInnerHTML={{ __html: story }}></p>
                                    </>
                                )}
                                {characters && (
                                    <>
                                        <h4 className="title is-4 card-subtitle extra-margin">Characters</h4>
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
                                <h4 className="title is-4 card-subtitle extra-margin">Gameplay Video</h4>
                                <div className="video-container">
                                    <LazyIframe
                                        src={youtubeEmbed}
                                        width="100%"
                                        height="615"
                                        frameBorder="0"
                                        allowFullScreen
                                        title={`${title} Gameplay Video`}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {/* SoundCloud プレイヤー埋め込み */}
                    {soundcloudEmbed && (
                        <div className="columns is-marginless">
                            <div className="column">
                                <h4 className="title is-4 card-subtitle extra-margin">SoundCloud Player</h4>
                                <LazyIframe
                                    src={soundcloudEmbed}
                                    width="100%"
                                    height="450"
                                    scrolling="no"
                                    frameBorder="no"
                                    allow="autoplay"
                                    title={`${title} SoundCloud Player`}
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
