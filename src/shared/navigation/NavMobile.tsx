import { useLogin } from 'hooks/useLogin';
import Button from 'shared/form/Button';
import NavLinkCustom from 'shared/links/NavLink';
import { NAVLINKS_CONFIG } from 'util/navlinks-data';

import './NavMobile.scss';

type NavMobileProps = {};

const NavMobile: React.FC<NavMobileProps> = () => {
    const { handleUserLogout } = useLogin();

    return (
        <ul className="navigation__list--mobile">
            {NAVLINKS_CONFIG.map((navLink) => {
                const { to, text } = navLink;
                return (
                    <li key={to} className="navigation__item--mobile">
                        <NavLinkCustom to={to} text={text} />
                    </li>
                );
            })}
            <li className="navigation__item--mobile">
                <Button type="button" width={160} onClick={handleUserLogout}>
                    logout
                </Button>
            </li>
        </ul>
    );
};
export default NavMobile;
