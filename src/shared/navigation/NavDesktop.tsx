import NavLinkCustom from 'shared/links/NavLink';
import { NAVLINKS_CONFIG } from 'util/navlinks-data';

import './NavDesktop.scss';

import React from 'react';

type NavDesktopProps = {};

const NavDesktop: React.FC<NavDesktopProps> = () => {
    return (
        <ul className="header__navigation-list">
            {NAVLINKS_CONFIG.map((navLink) => {
                const { to, text } = navLink;
                return (
                    <li key={to} className="header__item">
                        <NavLinkCustom to={to} text={text} />
                    </li>
                );
            })}
        </ul>
    );
};
export default NavDesktop;
