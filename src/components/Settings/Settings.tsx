import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './../../App.module.css'
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { CounterType, resetCounterAC, setCounterErrorAC, setMaxCounterAC, setStartCounterAC } from '../../state/counterReducer';
import { StoreType } from '../../state/store';

export const Settings = () => {
    const dispatch = useDispatch()
    const maxCounter = useSelector<StoreType, number>(state => state.display.maxCounter)
    const startCounter = useSelector<StoreType, number>(state => state.display.startCounter)

    const [maxInputValue, setMaxInputValue] = useState<number>(maxCounter)
    const [startInputValue, setStartInputValue] = useState<number>(startCounter)
    const [maxInputError, setMaxInputError] = useState<boolean>(false)
    const [startInputError, setStartInputError] = useState<boolean>(false)

    const maxInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value)
        if (isNaN(value)) return
        setMaxInputValue(value)
    }

    const startInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value)
        if (isNaN(value)) return
        setStartInputValue(value)
    }

    const setHandler = () => {
        if (startInputError || maxInputError) return

        dispatch(setStartCounterAC(startInputValue))
        dispatch(setMaxCounterAC(maxInputValue))
        dispatch(resetCounterAC())
        dispatch(setCounterErrorAC(''))
    }

    const clearHandler = () => {
        setStartInputValue(startCounter)
        setMaxInputValue(maxCounter)
        dispatch(setCounterErrorAC(''))
    }

    useEffect(() => {
        let setCounterError = ''

        if (startInputValue < 0) {
            setStartInputError(true)
            setCounterError = 'start value must be positive'
        } else if (startInputValue > maxInputValue) {
            setStartInputError(true)
            setCounterError = 'start value more than max'
        } else if (startInputValue === maxInputValue) {
            setStartInputError(true)
            setCounterError = 'values are equal'
        } else if (maxInputValue !== maxCounter || startInputValue !== startCounter) {
            setCounterError = 'press set'
            setStartInputError(false)
        } else {
            setCounterError = ''
            setStartInputError(false)
        }

        if (maxInputValue < 0) {
            setMaxInputError(true)
            setCounterError = 'max value must be positive'
        } else if (maxInputValue < startInputValue) {
            setMaxInputError(true)
            setCounterError = 'max value lower than start'
        } else if (maxInputValue === startInputValue) {
            setMaxInputError(true)
            setCounterError = 'values are equal'
        } else if (maxInputValue !== maxCounter || startInputValue !== startCounter) {
            setCounterError = 'press set'
            setMaxInputError(false)
        } else {
            setCounterError = ''
            setMaxInputError(false)
        }

        dispatch(setCounterErrorAC(setCounterError))

    }, [startInputValue, maxInputValue])

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

                <Button
                    onClick={clearHandler}
                    className={s.button}
                >Clear</Button>

            </div>
        </>
    );
};

