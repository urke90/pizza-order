import { NavLink } from 'react-router-dom';

import './NavLink.scss';

type NavLinkProps = {
    text: string;
    to: string;
};

const NavLinkCustom: React.FC<NavLinkProps> = ({ text, to }) => {
    return (
        <NavLink
            to={to}
            style={({ isActive }) => {
                return {
                    color: isActive ? '#001e28' : '#feb139',
                    backgroundColor: isActive ? '#feb139' : '#001e28',
                    padding: '6px 10px'
                };
            }}
        >
            {text}
        </NavLink>
    );
};
export default NavLinkCustom;
