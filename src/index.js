import React from 'react';
import { createRoot } from 'react-dom/client';
import Whatsnew from './components/Whatsnew';
import Portfolio from "./components/Portfolio";

// What's new section
const whatsNewContainer = document.getElementById('whats_new');
if (whatsNewContainer) {
    const whatsNewRoot = createRoot(whatsNewContainer);
    whatsNewRoot.render(
        React.createElement(
            React.StrictMode,
            null,
            React.createElement(Whatsnew, null)
        )
    );
}

// Portfolio section
const portfolioContainer = document.getElementById('portfolio_area');
if (portfolioContainer) {
    const portfolioRoot = createRoot(portfolioContainer);
    portfolioRoot.render(
        React.createElement(
            React.StrictMode,
            null,
            React.createElement(Portfolio, null)
        )
    );
}
