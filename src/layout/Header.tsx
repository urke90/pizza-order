import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GiFullPizza } from 'react-icons/gi';
import { HiMenu } from 'react-icons/hi';
import { useLogin } from 'hooks/useLogin';

import NavDesktop from 'shared/navigation/NavDesktop';
import NavMobile from 'shared/navigation/NavMobile';
import Button from 'shared/form/Button';

import './Header.scss';

const Header: React.FC = () => {
    const { handleUserLogout } = useLogin();
    const [openedMenu, setOpenedMenu] = useState(false);

    const handleToggleMenu = useCallback(
        () => setOpenedMenu((prevOpenedState) => !prevOpenedState),
        []
    );

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/">
                        <GiFullPizza className="header__logo-img" />
                    </Link>
                </div>
                <nav className="header__navigation">
                    <NavDesktop />
                    <div className="header__btn--logout">
                        <Button type="button" onClick={handleUserLogout}>
                            logout
                        </Button>
                    </div>
                    <HiMenu
                        className="header__menu"
                        onClick={handleToggleMenu}
                    />
                    <NavMobile
                        opened={openedMenu}
                        onClick={handleToggleMenu}
                        onLogout={handleUserLogout}
                    />
                </nav>
            </div>
        </header>
    );
};

export default Header;

/**
 * LEFT TO CREATE A MOBILE
 */
