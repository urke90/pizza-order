import { IFormState } from 'ts/form';
import { ADDRESS_INPUTS_CONFIG } from 'config/address.config';

import Input from 'shared/form/Input';

import './AddressCreateEdit.scss';

/**
 * THIS WILL BE REUSABLE COMPONENT FOR CREATING AND UPDATING ADDRESS SO WE MUST BE ABLE TO SET INITIAL VALUES
 * WE WILL NEED TO SAVE ADDRESS TO REDUX
 * WE WILL NEED TO SABVE ADDRSS TO DB
 * CONFIRM BUTTON WILL BE IN MODAL (PARRENT COMPONENT) so we will need to pass callback func to update fields ===>
 * CALL useForm() in PARENT COMPONENT ?!?!??!?!?!??!
 */

interface IAddressCreateEditProps {
    formState: IFormState;
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleInputBlur: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const AddressCreateEdit: React.FC<IAddressCreateEditProps> = ({
    formState,
    handleInputChange,
    handleInputBlur
}) => {
    const handleSubmitAddress = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="address-create-edit">
            <form
                className="address-create-edit__form"
                onSubmit={handleSubmitAddress}
            >
                {ADDRESS_INPUTS_CONFIG.length > 0 &&
                    ADDRESS_INPUTS_CONFIG.map(
                        ({
                            type,
                            name,
                            id,
                            placeholder,
                            label,
                            errorMessage
                        }) => (
                            <div
                                key={id}
                                className="address-create-edit__form-control"
                            >
                                <Input
                                    type={type}
                                    name={name}
                                    id={id}
                                    placeholder={placeholder}
                                    label={label}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    value={formState.inputs[name].value}
                                    isValid={formState.inputs[name].isValid}
                                    isTouched={formState.inputs[name].isTouched}
                                    errorMessage={errorMessage}
                                />
                            </div>
                        )
                    )}
            </form>
        </div>
    );
};
export default AddressCreateEdit;
