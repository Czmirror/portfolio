// src/index.jsから読み込まれ、お知らせを3件ずつ表示します。状態は表示ページだけを保持します。
import React, { useState } from 'react';
import whatsnewData from '../data/whats_new.json';

const Whatsnew = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 3;

    const totalPages = Math.max(1, Math.ceil(whatsnewData.length / pageSize));
    const currentNews = whatsnewData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    const canGoPrevious = pageIndex > 0;
    const canGoNext = pageIndex < totalPages - 1;

    const showPrevious = () => {
        setPageIndex((current) => Math.max(0, current - 1));
    };

    const showNext = () => {
        setPageIndex((current) => Math.min(totalPages - 1, current + 1));
    };

    const renderNewsCard = (datum) => (
        <div className="card whats-new-card">
            <header className="card-header">
                <p className="card-header-title">
                    <time dateTime={datum.date} className="mr-1">{new Date(datum.date).toLocaleDateString()}</time>

                    {datum.title}
                </p>
            </header>
            <div className="card-content">
                <div className="content">
                    {datum.content}
                </div>
            </div>
        </div>
    );

    return (
        <section className="section whats-new-section">
            <div className="container">
                <div className="whats-new-heading">
                    <h2 className="title is-3">What's new</h2>
                    {whatsnewData.length > pageSize && (
                        <p className="whats-new-count">
                            {pageIndex + 1} / {totalPages}
                        </p>
                    )}
                </div>
                <div className="whats-new-carousel">
                    {whatsnewData.length > pageSize && (
                        <button
                            type="button"
                            className="whats-new-nav whats-new-nav--prev"
                            onClick={showPrevious}
                            disabled={!canGoPrevious}
                            aria-label="前の3件を表示"
                        >
                            <span aria-hidden="true">‹</span>
                        </button>
                    )}
                    <div className="whats-new-track" key={pageIndex}>
                        <div className="columns is-multiline">
                            {currentNews.map((datum) => (
                                <div className="column is-one-third" key={datum.id}>
                                    {renderNewsCard(datum)}
                                </div>
                            ))}
                        </div>
                    </div>
                    {whatsnewData.length > pageSize && (
                        <button
                            type="button"
                            className="whats-new-nav whats-new-nav--next"
                            onClick={showNext}
                            disabled={!canGoNext}
                            aria-label="次の3件を表示"
                        >
                            <span aria-hidden="true">›</span>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Whatsnew;
