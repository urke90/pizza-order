import { IFormState } from 'ts/form';
import { ADDRESS_INPUTS_CONFIG } from 'config/address.config';

import Input from 'shared/form/Input';

import './AddressCreateEdit.scss';

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

                            placeholder,
                            label,
                            errorMessage
                        }) => (
                            <div
                                key={name}
                                className="address-create-edit__form-control"
                            >
                                <Input
                                    type={type}
                                    name={name}
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
