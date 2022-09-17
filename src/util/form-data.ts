import { IFormState } from 'ts/form';

export const loginForm: IFormState = {
    inputs: {
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    },
    formIsValid: false
};

export const signupForm: IFormState = {
    inputs: {
        name: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    },
    formIsValid: false
};
