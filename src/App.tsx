import { css } from 'linaria';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bank from './bank';
import Footer from './footer';
import Header from './header';
import Home from './home';
import Navigation from './navigation';
import Shop from './shop';
import SocialLinks from './social-links';

const header = css`
    text-transform: uppercase;
`;

// TODO: centralize states
// TODO: styling
class App extends React.Component {
    public render() {
        return (
            <>
                <Header text="Title" className={header}>
                    <Navigation
                        className={'nav1'}
                        items={[
                            {
                                title: 'Home',
                                url: '/',
                            },
                            {
                                title: 'Shop',
                                url: '/shop',
                            },
                            {
                                title: 'Bank',
                                url: '/bank',
                            },
                        ]}
                    />
                </Header>
                <main>
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/bank" component={Bank} />
                        <Route path="/shop" component={Shop} />
                    </Switch>
                </main>
                <Footer text="Footer" className="footer">
                    <SocialLinks
                        items={[
                            {
                                target: '_blank',
                                title: 'Facebook',
                                url: 'https://facebook.com/cinelli.bicycles',
                            },
                        ]}
                    />
                </Footer>
            </>
        );
    }
}

if (process.env.NODE_ENV === 'development') {
    const hotLoader = require('react-hot-loader/root');
    // @ts-ignore
    App = hotLoader.hot(App) as App;
}

export default App;
