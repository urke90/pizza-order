import React from 'react';

import './Input.scss';

interface IInputProps {
    type: 'email' | 'hidden' | 'number' | 'password';
    name: string;
    id: string;
    labelText: string;
    placeholder: string;
    textarea?: boolean;
    rows?: number;
    cols?: number;
    onChange?: (value: any) => void;
}

const Input: React.FC<IInputProps> = ({
    type,
    id,
    labelText,
    name,
    placeholder,
    textarea = false,
    rows = 3,
    cols = 3,
    onChange
}) => {
    if (textarea) {
        return (
            <div className="input">
                <label className="input__label" htmlFor={id}>
                    {labelText}
                </label>
                <textarea
                    className="input__textarea input__element"
                    id={id}
                    name={name}
                    cols={cols}
                    rows={rows}
                    placeholder={placeholder}
                    onChange={
                        onChange ? (e) => onChange(e.target.value) : () => {}
                    }
                ></textarea>
            </div>
        );
    }

    // if (type === 'number') {
    //     return (
    //         <div className="input">
    //             <label className="input__label" htmlFor={id}>
    //                 {labelText}
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
                {labelText}
            </label>
            <input
                className="input__element"
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={onChange ? (e) => onChange(e.target.value) : () => {}}
            />
        </div>
    );
};
export default Input;
