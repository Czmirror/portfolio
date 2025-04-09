// src/components/GameSection.jsx
import React from 'react';

const GameSection = ({
                         sectionId,
                         title,
                         about,
                         platform,
                         demoLinks,
                         youtubeEmbed,
                         soundcloudEmbed,
                         imageSrc,
                         story,
                         characters,
                     }) => {
    return (
        <section id={sectionId} className="section portfolio slide-in">
            <div className="container">
                {sectionId && (
                    <h2 className="title">Portfolio</h2>
                )}
                <div className="box">
                    <h3 className="title is-3 has-text-centered">{title}</h3>

                    {/* ゲームビジュアルと説明 */}
                    <div className="columns">
                        <div className="column">
                            <div className="box">
                                <figure className="image is-1by1 bloom-effect">
                                    <img src={imageSrc} alt={`${title} Game Visual`} />
                                </figure>
                            </div>
                        </div>
                        <div className="column">
                            <h4 className="title is-4 mb-2">About</h4>
                            {/* dangerouslySetInnerHTML を利用して HTML をそのまま出力 */}
                            <p className="about-content" dangerouslySetInnerHTML={{ __html: about }}></p>

                            {platform && (
                                <>
                                    <h4 className="title is-4 mt-5 mb-2">Platform</h4>
                                    <p className="about-content" dangerouslySetInnerHTML={{ __html: platform }}></p>
                                </>
                            )}

                            {demoLinks && demoLinks.length > 0 && (
                                <>
                                    <h4 className="title is-4 mt-5 mb-2">Demo</h4>
                                    <ul>
                                        {demoLinks.map((link) => (
                                            <li key={link.url}>
                                                <a href={link.url}>{link.text}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {story && (
                                <>
                                    <h4 className="title is-4 mb-2">Story</h4>
                                    <p className="about-content" dangerouslySetInnerHTML={{ __html: story }}></p>
                                </>
                            )}
                            {characters && (
                                <>
                                    <h4 className="title is-4 mb-2">Characters</h4>
                                    <p className="about-content" dangerouslySetInnerHTML={{ __html: characters }}></p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* YouTube 動画埋め込み */}
                    {youtubeEmbed && (
                        <div className="columns is-marginless">
                            <div className="column">
                                <h4 className="title is-4">Gameplay Video</h4>
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
                                <h4 className="title is-4">SoundCloud Player</h4>
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
