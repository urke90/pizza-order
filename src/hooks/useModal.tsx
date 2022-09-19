import { useState, useCallback } from 'react';

export const useModal = (): [boolean, () => void] => {
    const [showModal, setShowModal] = useState(false);

    const handleToggleModal = useCallback(
        () => setShowModal((prevShowState) => !prevShowState),
        []
    );

    return [showModal, handleToggleModal];
};
