import React from 'react';
import ReactDom, { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import DefaultErrorBoundary from '../shared/_utils/DefaultErrorBoundary';
import App from '../shared/app/App';

if (process.env.NODE_ENV === 'development') {
    const axe = require('react-axe');
    axe(React, ReactDom, 1000);
}

hydrate(
    <React.StrictMode>
        <DefaultErrorBoundary>
            <Router>
                <App />
            </Router>
        </DefaultErrorBoundary>
    </React.StrictMode>,
    document.getElementById('app')
);
