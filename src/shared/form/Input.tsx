import './Input.scss';

interface IInputProps {
    type: 'text' | 'email' | 'hidden' | 'number' | 'password';
    name: string;
    id: string;
    label: string;
    placeholder: string;
    isTextarea?: boolean;
    rows?: number;
    cols?: number;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    value: string;
    isValid?: boolean;
    errorMessage?: string;
    onBlur: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    isTouched: boolean;
}

const Input: React.FC<IInputProps> = ({
    type,
    id,
    label,
    name,
    placeholder,
    isTextarea = false,
    rows = 3,
    cols = 3,
    onChange,
    value,
    isValid = true,
    onBlur,
    errorMessage,
    isTouched
}) => {
    if (isTextarea) {
        return (
            <div className="input">
                <label
                    className={`input__label ${
                        !isValid && isTouched ? 'input__label--invalid' : ''
                    }`}
                    htmlFor={id}
                >
                    {label}
                </label>
                <textarea
                    className={`input__textarea input__element ${
                        !isValid && isTouched ? 'input__element--invalid' : ''
                    }`}
                    id={id}
                    name={name}
                    cols={cols}
                    rows={rows}
                    placeholder={placeholder}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        onChange(e)
                    }
                    onBlur={onBlur}
                    value={value}
                ></textarea>
                {!isValid && isTouched && (
                    <p className="input__text--error">{errorMessage}</p>
                )}
            </div>
        );
    }

    return (
        <div className="input">
            <label
                className={`input__label ${
                    !isValid && isTouched ? 'input__label--invalid' : ''
                }`}
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className={`input__element ${
                    !isValid && isTouched ? 'input__element--invalid' : ''
                }`}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e)
                }
                value={value ? value : ''}
                onBlur={onBlur}
            />
            {!isValid && isTouched && (
                <p className="input__text--error">{errorMessage}</p>
            )}
        </div>
    );
};
export default Input;
