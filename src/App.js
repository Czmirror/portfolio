// src/App.js
import React from 'react';
import Whatsnew from './components/Whatsnew';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>My Portfolio</h1>
            </header>
            <main>
                <Whatsnew />
            </main>
        </div>
    );
}

export default App;
