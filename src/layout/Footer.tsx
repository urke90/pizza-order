import React from 'react';

import { AiFillLinkedin } from 'react-icons/ai';

import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <a
                    className="footer__link"
                    href="https://www.linkedin.com/in/uros-bijelic-151a36245/"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Uros Bijelic
                </a>
                <a
                    className="footer__link"
                    href="https://www.linkedin.com/in/uros-bijelic-151a36245/"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <AiFillLinkedin className="footer__link-icon" />
                </a>
            </div>
        </footer>
    );
};
export default Footer;
