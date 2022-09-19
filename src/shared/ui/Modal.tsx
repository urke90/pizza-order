import React from 'react';
import { createPortal } from 'react-dom';
import Button from 'shared/form/Button';
import Backdrop from './Backdrop';

import './Modal.scss';

interface IModalProps {
    show: boolean;
    headerTitle: string;
    children: React.ReactElement;
    footer?: React.ReactElement | null;
    onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({
    headerTitle,
    children,
    footer,
    onClose,
    show
}) => {
    if (!show) return null;

    const content = (
        <>
            <Backdrop onClose={onClose} show={show} />
            <div className="modal">
                <header className="modal__header">
                    <h3>{headerTitle}</h3>
                </header>
                <div className="modal__content">{children}</div>
                <footer className="modal__footer">
                    <div className="modal__button--custom">{footer}</div>
                    <div className="modal__button--close">
                        <Button type="button" onClick={onClose}>
                            close
                        </Button>
                    </div>
                </footer>
            </div>
        </>
    );

    return createPortal(
        content,
        document.getElementById('modal-root') as HTMLDivElement
    );
};
export default Modal;
