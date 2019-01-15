import * as React from 'react';

const Header: React.FunctionComponent<
    { text: string } & React.HTMLAttributes<HTMLElement>
> = ({ text, children, ...otherProps }) => (
    <header {...otherProps}>
        <h1>{text}</h1>
        {children}
    </header>
);

export default Header;
