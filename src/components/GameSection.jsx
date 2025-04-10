// src/components/GameSection.jsx
import React, { useState } from 'react';

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

    // GithubPage用URL設定
    const baseUrl = import.meta.env.BASE_URL || "";

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
                                    <video controls disablePictureInPicture className="main-media">
                                        <source src={baseUrl + currentMedia.src} type="video/mp4" />
                                        お使いのブラウザでは動画が再生できません。
                                    </video>
                                ) : (
                                    <img src={baseUrl + currentMedia.src} alt={`${title} Main Media`} className="main-media" />
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
                                                <video muted disablePictureInPicture className="thumbnail" preload="metadata">
                                                    <source src={baseUrl + item.src} type="video/mp4" />
                                                </video>
                                            ) : (
                                                <img src={baseUrl + item.src} alt={`${title} thumbnail ${index + 1}`} className="thumbnail" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* 右カラム：ゲーム概要 */}
                        <div className="column is-half">
                            <div className="game-overview">
                                {/* About のみ mt0 にして、他は extra-margin を追加 */}
                                <h4 className="title is-4 card-subtitle mt0">About</h4>
                                <p className="about-content" dangerouslySetInnerHTML={{ __html: about }}></p>
                                {platform && (
                                    <>
                                        <h4 className="title is-4 card-subtitle extra-margin">Platform</h4>
                                        <p className="about-content" dangerouslySetInnerHTML={{ __html: platform }}></p>
                                    </>
                                )}
                                {demoLinks && demoLinks.length > 0 && (
                                    <>
                                        <h4 className="title is-4 card-subtitle extra-margin">Demo</h4>
                                        <ul>
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
                                        <p className="about-content" dangerouslySetInnerHTML={{ __html: story }}></p>
                                    </>
                                )}
                                {characters && (
                                    <>
                                        <h4 className="title is-4 card-subtitle extra-margin">Characters</h4>
                                        <p className="about-content" dangerouslySetInnerHTML={{ __html: characters }}></p>
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
                                    <iframe
                                        width="100%"
                                        height="615"
                                        src={youtubeEmbed}
                                        frameBorder="0"
                                        allowFullScreen
                                        title={`${title} Gameplay Video`}
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* SoundCloud プレイヤー埋め込み */}
                    {soundcloudEmbed && (
                        <div className="columns is-marginless">
                            <div className="column">
                                <h4 className="title is-4 card-subtitle extra-margin">SoundCloud Player</h4>
                                <iframe
                                    width="100%"
                                    height="450"
                                    scrolling="no"
                                    frameBorder="no"
                                    allow="autoplay"
                                    src={soundcloudEmbed}
                                    title={`${title} SoundCloud Player`}
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GameSection;
