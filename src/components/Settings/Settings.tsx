import React, { ChangeEvent, FC, useState } from 'react';
import s from './../../App.module.css'
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

type PropsType = {
    startCounter: number
    maxCounter: number
    setStartCounter: (value: number) => void
    setMaxCounter: (value: number) => void
    setCounter: (value: number) => void
    setCounterError: (error: string) => void
    counterError: string
}

export const Settings: FC<PropsType> = ({
    startCounter,
    maxCounter,
    setStartCounter,
    setMaxCounter,
    setCounter,
    setCounterError,
    counterError,
}) => {

    const [maxInputValue, setMaxInputValue] = useState<number>(maxCounter)
    const [startInputValue, setStartInputValue] = useState<number>(startCounter)
    const [maxInputError, setMaxInputError] = useState<boolean>(false)
    const [startInputError, setStartInputError] = useState<boolean>(false)

    const maxInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value)
        if (isNaN(value)) return
        setMaxInputValue(value)

        setCounterError('press set')
        setMaxInputError(false)
        setStartInputError(false)

        if (value === startInputValue) {
            setMaxInputError(true)
            setStartInputError(false)
            setCounterError('values are equal')
        }

        if (value < startInputValue) {
            setMaxInputError(true)
            setStartInputError(false)
            setCounterError('max value lower than start')
        }

        checkNegative(startInputValue, value)
    }

    const startInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value)
        if (isNaN(value)) return
        setStartInputValue(value)


        setCounterError('press set')
        setMaxInputError(false)
        setStartInputError(false)

        if (value === maxInputValue) {
            setStartInputError(true)
            setMaxInputError(false)
            setCounterError('values are equal')
        }

        if (value > maxInputValue) {
            setStartInputError(true)
            setMaxInputError(false)
            setCounterError('start value more than max')
        }

        checkNegative(value, maxInputValue)

    }

    const setHandler = () => {
        if (startInputError || maxInputError) return

        setStartCounter(startInputValue)
        setMaxCounter(maxInputValue)
        setCounter(startInputValue)
        setCounterError('')
    }



    function checkNegative(start: number, max: number) {

        if (start < 0) {
            setStartInputError(true)
            setCounterError('start value must be positive')
        }

        if (max < 0) {
            setMaxInputError(true)
            setCounterError('max value must be positive')
        }
    }

    const disableSetButton =
        (maxInputValue === maxCounter && startInputValue === startCounter) ||
        startInputError || maxInputError


    return (
        <>
            <div className={s.display}>
                <div className={s.inputblock}>

                    <span>max value: </span>
                    <Input
                        inputType='number'
                        value={maxInputValue}
                        onChange={maxInputChangeHandler}
                        className={s.input + ' ' + (maxInputError && s.inputError)}
                    />

                </div>
                <div className={s.inputblock}>

                    <span>start value: </span>
                    <Input
                        inputType='number'
                        value={startInputValue}
                        onChange={startInputChangeHandler}
                        className={s.input + ' ' + (startInputError ? s.inputError : '')}
                    />

                </div>
            </div>
            <div className={s.buttons}>

                <Button
                    onClick={setHandler}
                    className={s.button}
                    disabled={disableSetButton}
                >SET</Button>

            </div>
        </>
    );
};

