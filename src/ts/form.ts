export interface IFormState {
    inputs: {
        [key: string]: {
            value: string;
            isValid: boolean;
            isTouched: boolean;
        };
    };
    formIsValid: boolean;
}
