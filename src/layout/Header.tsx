import React from 'react';
import { Link } from 'react-router-dom';
import { GiFullPizza } from 'react-icons/gi';

import NavLinkCustom from 'shared/links/NavLink';
import Button from 'shared/form/Button';

import './Header.scss';

type HeaderProps = {};

interface INavLinksConfig {
    to: string;
    text: string;
}

const NAVLINKS_CONFIG: INavLinksConfig[] = [
    {
        to: '/',
        text: 'main'
    },
    {
        to: '/orders',
        text: 'orders'
    },
    {
        to: '/custom-pizza',
        text: 'custom'
    }
];

const Header: React.FC<HeaderProps> = () => {
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/">
                        <GiFullPizza size={50} color="#feb139" />
                    </Link>
                </div>
                <nav className="header__navigation">
                    <ul className="header__navigation-list">
                        {NAVLINKS_CONFIG.map((navLink) => {
                            const { to, text } = navLink;
                            return (
                                <li className="header__item">
                                    <NavLinkCustom to={to} text={text} />
                                </li>
                            );
                        })}
                    </ul>
                    <Button type="button" onClick={() => {}}>
                        logout
                    </Button>
                </nav>
            </div>
        </div>
    );
};

export default Header;

/**
 * LEFT TO CREATE A MOBILE
 */
