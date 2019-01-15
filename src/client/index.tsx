import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import DefaultErrorBoundary from '../shared/_utils/DefaultErrorBoundary';
import App from '../shared/app/App';

if (process.env.NODE_ENV === 'development') {
    const axe = require('react-axe');
    axe(React, ReactDom, 1000);
}

ReactDom.render(
    <React.StrictMode>
        <DefaultErrorBoundary>
            <Router>
                <App />
            </Router>
        </DefaultErrorBoundary>
    </React.StrictMode>,
    document.getElementById('app')
);