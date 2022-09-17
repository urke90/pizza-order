import { useState } from 'react';
import Button from 'shared/form/Button';
import Modal from 'shared/ui/Modal';
import AddressCreateEdit from 'components/addresses/AddressCreate';
// import LoadingSpinner from 'shared/ui/LoadingSpinner';

import './Addresses.scss';

const Addresses: React.FC = () => {
    const [showModal, setShowModal] = useState(true);

    const addNewAddress = () => {
        console.log('add address button clicked ');
        setShowModal(true);
    };

    return (
        <div className="addresses">
            {showModal && (
                <Modal
                    headerTitle="Add New Address"
                    onClose={() => setShowModal(false)}
                >
                    <AddressCreateEdit />
                </Modal>
            )}
            <header className="addresses__header">
                <h2>Addresses</h2>
            </header>
            <div className="addresses__container">
                <div className="addresses__button-add">
                    <Button type="button" onClick={addNewAddress}>
                        Add address
                    </Button>
                </div>
                <ul className="addresses__list">
                    <li>address 1</li>
                    <li>address 2</li>
                    <li>address 3</li>
                </ul>
            </div>
        </div>
    );
};

export default Addresses;
