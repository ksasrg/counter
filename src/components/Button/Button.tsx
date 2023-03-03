import React, { FC, ReactNode } from 'react';

type ButtonPropsType = {
    children: ReactNode
    onClick: () => void
    disabled?: boolean
    className?: string
}

export const Button: FC<ButtonPropsType> = ({ children, onClick, disabled, className }) => {
    return (
        <button
            disabled={disabled}
            // disabled={true}
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    );
};

