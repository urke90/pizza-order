import React from 'react';

import './Input.scss';

interface IInputProps {
    type: 'email' | 'hidden' | 'number' | 'password';
    elName: string;
    id: string;
    labelText: string;
    placeholder: string;
    textarea?: boolean;
    rows?: number;
    cols?: number;
}

const Input: React.FC<IInputProps> = ({
    type,
    id,
    labelText,
    elName,
    placeholder,
    textarea = false,
    rows = 3,
    cols = 3
}) => {
    if (textarea) {
        return (
            <div>
                <label htmlFor={id}>{labelText}</label>
                <textarea
                    id={id}
                    name={elName}
                    cols={cols}
                    rows={rows}
                    placeholder={placeholder}
                ></textarea>
            </div>
        );
    }

    return (
        <div>
            <label htmlFor={id}>{labelText}</label>
            <input type={type} id={id} name={elName} />
        </div>
    );
};
export default Input;
