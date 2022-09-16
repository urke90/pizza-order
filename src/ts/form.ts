export interface IFormState {
    inputs: {
        [key: string]: {
            value: string;
            isValid: boolean;
        };
    };
    formIsValid: boolean;
}
