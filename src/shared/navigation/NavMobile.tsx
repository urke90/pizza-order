import { NAVLINKS_CONFIG } from 'config/navlinks.config';
import { generateGeneralClassName } from 'util/className-generators';

import Button from 'shared/form/Button';
import NavLinkCustom from 'shared/links/NavLinkCustom';
import Backdrop from 'shared/ui/Backdrop';

import './NavMobile.scss';

interface INavMobileProps {
    opened: boolean;
    onClick: () => void;
    onLogout: () => Promise<void>;
}

const NavMobile: React.FC<INavMobileProps> = ({
    onClick,
    opened,
    onLogout
}) => {
    return (
        <>
            <Backdrop show={opened} onClose={onClick} />
            <ul
                className={`navigation__list--mobile ${generateGeneralClassName(
                    opened,
                    'navigation__list--slide-down',
                    'navigation__list--slide-up'
                )}`}
            >
                {NAVLINKS_CONFIG.map((navLink) => {
                    const { to, text } = navLink;
                    return (
                        <li
                            key={to}
                            className="navigation__item--mobile"
                            onClick={onClick}
                        >
                            <NavLinkCustom to={to} text={text} />
                        </li>
                    );
                })}
                <li className="navigation__item--mobile">
                    <Button type="button" width="100%" onClick={onLogout}>
                        logout
                    </Button>
                </li>
            </ul>
        </>
    );
};
export default NavMobile;
