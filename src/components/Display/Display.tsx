import React, { FC, ReactNode } from 'react';

type DisplayPropsType = {
    children: ReactNode
    className?: string
}

export const Display: FC<DisplayPropsType> = ({ children, className }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

