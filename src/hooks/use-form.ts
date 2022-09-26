import { useReducer, useCallback } from 'react';
import { validateInput } from 'validators/validators';
import { IFormState } from 'ts/form';

enum TUseFormActionTypes {
    CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE',
    SET_INPUTS = 'SET_INPUTS',
    BLUR_INPUT = 'BLUR_INPUT'
}

type TUseFormActions =
    | {
          type: TUseFormActionTypes.CHANGE_INPUT_VALUE;
          payload: { name: string; value: string; isValid: boolean };
      }
    | {
          type: TUseFormActionTypes.SET_INPUTS;
          payload: IFormState;
      }
    | {
          type: TUseFormActionTypes.BLUR_INPUT;
          payload: string;
      };

const reducer = (state: IFormState, action: TUseFormActions) => {
    switch (action.type) {
        case TUseFormActionTypes.CHANGE_INPUT_VALUE: {
            const { name, value, isValid } = action.payload;

            const newState = {
                ...state,
                inputs: {
                    ...state.inputs,
                    [name]: {
                        ...state.inputs[name],
                        value,
                        isValid
                    }
                }
            };

            newState.formIsValid = Object.values(newState.inputs).every(
                ({ isValid }) => isValid === true
            );

            return newState;
        }
        case TUseFormActionTypes.SET_INPUTS: {
            return action.payload;
        }
        case TUseFormActionTypes.BLUR_INPUT: {
            const name = action.payload;
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [name]: {
                        ...state.inputs[name],
                        isTouched: true
                    }
                }
            };
        }

        default:
            return state;
    }
};

interface IUseForm {
    formState: IFormState;
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    setInputFields: (inputFields: IFormState) => void;
    handleInputBlur: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

export const useForm = (formSchema: IFormState): IUseForm => {
    const [formState, dispatch] = useReducer(reducer, formSchema);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const name = e.target.name;
            const value = e.target.value;
            const isValid = validateInput(value, name);

            dispatch({
                type: TUseFormActionTypes.CHANGE_INPUT_VALUE,
                payload: { name, value, isValid }
            });
        },
        []
    );

    const handleInputBlur = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            dispatch({
                type: TUseFormActionTypes.BLUR_INPUT,
                payload: e.target.name
            });
        },
        []
    );

    const setInputFields = useCallback((inputFields: IFormState) => {
        dispatch({
            type: TUseFormActionTypes.SET_INPUTS,
            payload: inputFields
        });
    }, []);

    return {
        formState,
        handleInputChange,
        handleInputBlur,
        setInputFields
    };
};
