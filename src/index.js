import React from 'react';
import ReactDOM from 'react-dom';
import Updates from './components/Updates';

ReactDOM.render(
    React.createElement(
        React.StrictMode,
        null,
        React.createElement(Updates, null)
    ),
    document.getElementById('root')
);
