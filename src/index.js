import React from 'react';
import ReactDOM from 'react-dom';
import Whatsnew from './components/Whatsnew';
import Portfolio from "./components/Portfolio";

ReactDOM.render(
    React.createElement(
        React.StrictMode,
        null,
        React.createElement(Whatsnew, null)
    ),
    document.getElementById('whats_new')
);

ReactDOM.render(
    React.createElement(
        React.StrictMode,
        null,
        React.createElement(Portfolio, null)
    ),
    document.getElementById('portfolio_area')
)
