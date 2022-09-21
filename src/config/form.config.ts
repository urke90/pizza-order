import { IFormState } from 'ts/form';
import { IAddress } from 'ts/address';

export const loginForm: IFormState = {
    inputs: {
        email: {
            value: '',
            isValid: false,
            isTouched: false
        },
        password: {
            value: '',
            isValid: false,
            isTouched: false
        }
    },
    formIsValid: false
};

export const signupForm: IFormState = {
    inputs: {
        name: {
            value: '',
            isValid: false,
            isTouched: false
        },
        email: {
            value: '',
            isValid: false,
            isTouched: false
        },
        password: {
            value: '',
            isValid: false,
            isTouched: false
        }
    },
    formIsValid: false
};

export const addressCreateForm: IFormState = {
    inputs: {
        city: {
            value: '',
            isValid: false,
            isTouched: false
        },
        zipCode: {
            value: '',
            isValid: false,
            isTouched: false
        },
        street: {
            value: '',
            isValid: false,
            isTouched: false
        },
        floor: {
            value: '',
            isValid: false,
            isTouched: false
        },
        apartment: {
            value: '',
            isValid: false,
            isTouched: false
        },
        phone: {
            value: '',
            isValid: false,
            isTouched: false
        }
    },
    formIsValid: false
};

export const addressUpdateForm = ({
    city,
    zipCode,
    street,
    floor,
    apartment,
    phone
}: IAddress): IFormState => {
    return {
        inputs: {
            city: {
                value: city,
                isValid: true,
                isTouched: false
            },
            zipCode: {
                value: zipCode,
                isValid: true,
                isTouched: false
            },
            street: {
                value: street,
                isValid: true,
                isTouched: false
            },
            floor: {
                value: floor,
                isValid: true,
                isTouched: false
            },
            apartment: {
                value: apartment,
                isValid: true,
                isTouched: false
            },
            phone: {
                value: phone,
                isValid: true,
                isTouched: false
            }
        },
        formIsValid: true
    };
};
