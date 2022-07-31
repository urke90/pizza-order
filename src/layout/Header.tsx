import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiFullPizza } from 'react-icons/gi';
import { HiMenu } from 'react-icons/hi';

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
    const [openedMenu, setOpenedMenu] = useState(false);
    const menu = useRef<HTMLUListElement>(null);

    const handleOpenMenu = () => setOpenedMenu(!openedMenu);

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
                                    <NavLinkCustom
                                        key={to}
                                        to={to}
                                        text={text}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                    <div className="header__btn--logout">
                        <Button type="button" onClick={() => {}}>
                            logout
                        </Button>
                    </div>
                    <HiMenu
                        className="header__menu"
                        size={50}
                        color="#feb139"
                        onClick={handleOpenMenu}
                    />
                    {openedMenu && (
                        <ul
                            className="header__navigation-list--mobile"
                            ref={menu}
                        >
                            {NAVLINKS_CONFIG.map((navLink) => {
                                const { to, text } = navLink;
                                return (
                                    <li className="header__item--mobile">
                                        <NavLinkCustom
                                            key={to}
                                            to={to}
                                            text={text}
                                        />
                                    </li>
                                );
                            })}
                            <li className="header__item--mobile">
                                <Button
                                    type="button"
                                    width={160}
                                    onClick={() => {}}
                                >
                                    logout
                                </Button>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Header;

/**
 * LEFT TO CREATE A MOBILE
 */
