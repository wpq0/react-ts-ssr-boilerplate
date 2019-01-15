import * as React from 'react';

const Footer: React.FunctionComponent<
    { text: string } & React.HTMLAttributes<HTMLElement>
> = ({ text, children, ...otherProps }) => (
    <footer {...otherProps}>
        {text}
        {children}
    </footer>
);

export default Footer;
