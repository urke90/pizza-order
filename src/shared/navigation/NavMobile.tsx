import Button from 'shared/form/Button';
import NavLinkCustom from 'shared/links/NavLink';
import { useLogin } from 'hooks/useLogin';

import './NavMobile.scss';

import { NAVLINKS_CONFIG } from 'util/navlinks-data';

type NavMobileProps = {};

const NavMobile: React.FC<NavMobileProps> = () => {
    const { handleUserLogout } = useLogin();

    return (
        <ul className="header__navigation-list--mobile">
            {NAVLINKS_CONFIG.map((navLink) => {
                const { to, text } = navLink;
                return (
                    <li key={to} className="header__item--mobile">
                        <NavLinkCustom to={to} text={text} />
                    </li>
                );
            })}
            <li className="header__item--mobile">
                <Button type="button" width={160} onClick={handleUserLogout}>
                    logout
                </Button>
            </li>
        </ul>
    );
};
export default NavMobile;
