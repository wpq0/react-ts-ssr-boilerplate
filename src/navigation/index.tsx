import * as React from 'react';
import { NavLink } from 'react-router-dom';

export interface INavItem {
    title: string;
    url: string;
}

const Navigation: React.FunctionComponent<
    React.HTMLAttributes<HTMLElement> & { items: INavItem[] }
> = ({ items = [], ...otherProps }) => (
    <nav {...otherProps}>
        <ul>
            {items.map((l, i) => (
                <li key={i}>
                    <NavLink to={l.url}>{l.title}</NavLink>
                </li>
            ))}
        </ul>
    </nav>
);
export default Navigation;
