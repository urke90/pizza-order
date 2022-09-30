import NavLinkCustom from 'shared/links/NavLinkCustom';
import { NAVLINKS_CONFIG } from 'config/navlinks.config';

import './NavDesktop.scss';

const NavDesktop: React.FC = () => {
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
