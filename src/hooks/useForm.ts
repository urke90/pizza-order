import { useReducer, useCallback } from 'react';
import { validateInput } from 'validators/validators';
import { IFormState } from 'ts/form';

/**
 * 1. moramo imati skelet sa inputima ( formIsValid ) => prop koji ce da enable/disable submit button
 * 2. moramo da validiramo inpute
 * 3. func koja ce da setuje vrednosti inputa, da prepoluate ako se radi neki update
 * 4. ako su svi inputi isValid onda formIsValid === true;
 * 5. func handleChange koju prosledjujem inputu za onChange
 */

enum TUseFormActionTypes {
    CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE',
    SET_INPUTS = 'SET_INPUTS'
}

type TUseFormActions =
    | {
          type: TUseFormActionTypes.CHANGE_INPUT_VALUE;
          payload: { name: string; value: string; isValid: boolean };
      }
    | {
          type: TUseFormActionTypes.SET_INPUTS;
          payload: IFormState;
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
                        value,
                        isValid
                    }
                }
            };

            newState.formIsValid = Object.values(newState.inputs).every(
                ({ isValid }) => isValid === true
            );

            console.log(
                'newState.formIsValid IN REDUCER FUNC',
                newState.formIsValid
            );

            return newState;
        }
        case TUseFormActionTypes.SET_INPUTS: {
            return action.payload;
        }

        default:
            return state;
    }
};

interface IUseForm {
    state: IFormState;
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    setInputFields: (inputFields: IFormState) => void;
}

export const useForm = (formSchema: IFormState): IUseForm => {
    const [state, dispatch] = useReducer(reducer, formSchema);

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

    const setInputFields = useCallback((inputFields: IFormState) => {
        dispatch({
            type: TUseFormActionTypes.SET_INPUTS,
            payload: inputFields
        });
    }, []);

    return {
        state,
        handleInputChange,
        setInputFields
    };
};
