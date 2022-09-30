import { NavLink } from 'react-router-dom';

import './NavLinkCustom.scss';

interface INavLinkProps {
    text: string;
    to: string;
}

const NavLinkCustom: React.FC<INavLinkProps> = ({ text, to }) => {
    return (
        <div className="custom-nav-link">
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
        </div>
    );
};
export default NavLinkCustom;
