import { IFormState } from 'ts/form';

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
