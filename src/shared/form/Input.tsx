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
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    initValue?: string | number;
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
    initValue
}) => {
    if (textarea) {
        return (
            <div className="input">
                <label className="input__label" htmlFor={id}>
                    {label}
                </label>
                <textarea
                    className="input__textarea input__element"
                    id={id}
                    name={name}
                    cols={cols}
                    rows={rows}
                    placeholder={placeholder}
                    onChange={
                        onChange
                            ? (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                  onChange(e)
                            : () => {}
                    }
                ></textarea>
            </div>
        );
    }

    // if (type === 'number') {
    //     return (
    //         <div className="input">
    //             <label className="input__label" htmlFor={id}>
    //                 {label}
    //             </label>
    //             <input
    //                 className="input__element"
    //                 type={type}
    //                 id={id}
    //                 name={name}
    //                 placeholder={placeholder}
    //             />
    //         </div>
    //     );
    // }

    return (
        <div className="input">
            <label className="input__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="input__element"
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={
                    onChange
                        ? (e: React.ChangeEvent<HTMLInputElement>) =>
                              onChange(e)
                        : () => {}
                }
                value={initValue ? initValue : ''}
            />
        </div>
    );
};
export default Input;
