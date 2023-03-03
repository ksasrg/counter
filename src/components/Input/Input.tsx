import React, { ChangeEvent, FC } from 'react';

type InputType = 'number'

type PropsType = {
    inputType: InputType
    value: number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    className?: string
}

export const Input: FC<PropsType> = ({
    inputType,
    value,
    onChange,
    className
}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    }

    return (
        <input
            type={inputType}
            value={value}
            onChange={onChangeHandler}
            className={className}
        />
    );
};

