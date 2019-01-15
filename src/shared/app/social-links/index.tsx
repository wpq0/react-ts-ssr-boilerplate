import * as React from 'react';

interface ISocialLink {
    url: string;
    title: string;
    target: '_blank' | string;
}

const SocialLinks: React.FunctionComponent<
    React.HTMLAttributes<HTMLUListElement> & { items: ISocialLink[] }
> = ({ items, ...otherProps }) => {
    return items.length > 0 ? (
        <ul {...otherProps}>
            {items.map((link, index) => (
                <li key={index}>
                    <a href={link.url} target={link.target}>
                        {link.title}
                    </a>
                </li>
            ))}
        </ul>
    ) : null;
};

export default SocialLinks;
