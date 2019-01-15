import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { render } from 'react-testing-library';
import App from './App';

describe('App', () => {
    it('Renders without errors', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
    });
});
