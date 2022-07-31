import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiFullPizza } from 'react-icons/gi';
import { HiMenu } from 'react-icons/hi';

import NavDesktop from 'shared/navigation/NavDesktop';
import NavMobile from 'shared/navigation/NavMobile';
import Button from 'shared/form/Button';
import { useLogin } from 'hooks/useLogin';

import './Header.scss';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
    const [openedMenu, setOpenedMenu] = useState(false);
    const { handleUserLogout } = useLogin();

    const handleOpenMenu = () => setOpenedMenu(!openedMenu);

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/">
                        <GiFullPizza size={50} color="#feb139" />
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
                        size={50}
                        color="#feb139"
                        onClick={handleOpenMenu}
                    />
                    {openedMenu && <NavMobile />}
                </nav>
            </div>
        </header>
    );
};

export default Header;

/**
 * LEFT TO CREATE A MOBILE
 */
