import React from 'react';

import './Button.scss';

interface IButtonProps {
    type: 'button' | 'reset' | 'submit';
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
    width: number;
    height: number;
    bgColor: 'red' | 'dark' | 'green' | 'yellow' | 'orange';
    // textColor: 'red' | 'dark' | 'green' | 'yellow' | 'orange';
    // outlined?: boolean;
}

const BUTTON_COLOR = {
    red: '#d61c4e',
    dark: '#293462',
    orange: ' #feb139',
    yellow: '#fff80a',
    green: '#3ccf4e',
    white: '#ffffff'
};

const Button: React.FC<IButtonProps> = ({
    type,
    disabled,
    children,
    onClick,
    width,
    height,
    bgColor
    // outlined
}) => {
    const btnBGcolor = BUTTON_COLOR[bgColor];

    // console.log('btnBGcolor', btnBGcolor);

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={{
                width,
                height,
                backgroundColor: BUTTON_COLOR[bgColor]
            }}
        >
            {children}
        </button>
    );
};

export default Button;
