import React from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

interface IModalProps {
    headerTitle: string;
    children: React.ReactElement;
    footer?: React.ReactElement | string;
}

const Modal: React.FC<IModalProps> = ({ headerTitle, children, footer }) => {
    const content = (
        <div className="modal">
            <header className="modal__header">
                <h3>{headerTitle}</h3>
            </header>
            <div className="modal__content">{children}</div>
            <footer className="modal__footer">{footer}</footer>
        </div>
    );

    return createPortal(
        content,
        document.getElementById('modal-root') as HTMLDivElement
    );
};
export default Modal;
