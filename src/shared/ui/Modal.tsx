import React from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

interface IModalProps {
    headerTitle: string;
    children: React.ReactElement;
}

const Modal: React.FC<IModalProps> = ({ headerTitle, children }) => {
    // return <div className="modal">This is modal component</div>;

    const content = (
        <div className="modal">
            <div className="modal__header">
                <h3>{headerTitle}</h3>
            </div>
            <div className="modal__content">{children}</div>
        </div>
    );

    return createPortal(
        content,
        document.getElementById('modal-root') as HTMLDivElement
    );
};
export default Modal;
