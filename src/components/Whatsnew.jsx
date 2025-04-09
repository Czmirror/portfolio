import React, { useEffect, useState } from 'react';
import whatsnewData from '../data/whats_new.json';

const Whatsnew = () => {
    const [whatsnews, setWhatsnews] = useState([]);

    useEffect(() => {
        setWhatsnews(whatsnewData);
    }, []);

    return (
        <section className="section">
            <div className="container">
                <h2 className="title is-3">What's new</h2>
                <div className="columns is-multiline">
                    {whatsnews.map((datum) => (
                        <div className="column is-one-third" key={datum.id}>
                            <div className="card">
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Whatsnew;
