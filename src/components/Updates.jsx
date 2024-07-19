import React, { useEffect, useState } from 'react';
import updatesData from '../data/updates.json';

const Updates = () => {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        setUpdates(updatesData);
    }, []);

    return (
        <section className="section">
            <div className="container">
                <h2 className="title is-3">What's new</h2>
                <div className="columns is-multiline">
                    {updates.map((update) => (
                        <div className="column is-one-third" key={update.id}>
                            <div className="card">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        <time dateTime={update.date} className="mr-1">{new Date(update.date).toLocaleDateString()}</time>

                                        {update.title}
                                    </p>
                                </header>
                                <div className="card-content">
                                    <div className="content">
                                        {update.content}
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

export default Updates;
