// 最新3件を一覧で見せ、各記事の本文と過去の更新は必要に応じて開けるようにします。
import React from 'react';
import whatsnewData from '../data/whats_new.json';

const latestNews = whatsnewData.slice(0, 3);
const olderNews = whatsnewData.slice(3);

const NewsList = ({ entries }) => (
    <ul className="whats-new-list">
        {entries.map(({ id, date, title, content }) => (
            <li key={id}>
                <details className="whats-new-entry">
                    <summary>
                        <time dateTime={date}>{date.replace(/-0?/g, '/')}</time>
                        <span>{title}</span>
                    </summary>
                    <p>{content}</p>
                </details>
            </li>
        ))}
    </ul>
);

const Whatsnew = () => (
    <section className="section whats-new-section" aria-labelledby="whats-new-title">
        <div className="container">
            <h2 id="whats-new-title" className="title is-3">更新履歴</h2>
            <NewsList entries={latestNews} />
            {olderNews.length > 0 && (
                <details className="whats-new-archive">
                    <summary>過去の更新を見る</summary>
                    <NewsList entries={olderNews} />
                </details>
            )}
        </div>
    </section>
);

export default Whatsnew;
