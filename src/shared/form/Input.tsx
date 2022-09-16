import React from 'react';

import './Input.scss';

interface IInputProps {
    type: 'text' | 'email' | 'hidden' | 'number' | 'password';
    name: string;
    id: string;
    label: string;
    placeholder: string;
    textarea?: boolean;
    rows?: number;
    cols?: number;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    value: string;
    isValid?: boolean;
    errorMessage?: string;
}

const Input: React.FC<IInputProps> = ({
    type,
    id,
    label,
    name,
    placeholder,
    textarea = false,
    rows = 3,
    cols = 3,
    onChange,
    value,
    isValid = true,
    errorMessage
}) => {
    if (textarea) {
        return (
            <div className="input">
                <label
                    className={`input__label ${
                        !isValid ? 'input__label--invalid' : ''
                    }`}
                    htmlFor={id}
                >
                    {label}
                </label>
                <textarea
                    className={`input__textarea input__element ${
                        !isValid ? 'input__element--invalid' : ''
                    }`}
                    id={id}
                    name={name}
                    cols={cols}
                    rows={rows}
                    placeholder={placeholder}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        onChange(e)
                    }
                ></textarea>
                {!isValid && (
                    <p className="input__text--error">{errorMessage}</p>
                )}
            </div>
        );
    }

    return (
        <div className="input">
            <label
                className={`input__label ${
                    !isValid ? 'input__label--invalid' : ''
                }`}
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className={`input__element ${
                    !isValid ? 'input__element--invalid' : ''
                }`}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e)
                }
                value={value ? value : ''}
            />
            {!isValid && <p className="input__text--error">{errorMessage}</p>}
        </div>
    );
};
export default Input;
