import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './../../App.module.css'
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { CounterType, resetCounterAC, setCounterErrorAC, setMaxCounterAC, setStartCounterAC } from '../../state/counterReducer';
import { StoreType } from '../../state/store';

export const Settings = () => {
    const dispatch = useDispatch()
    const display = useSelector<StoreType, CounterType>(state => state.display)
    const maxCounter = display.maxCounter
    const startCounter = display.startCounter

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
        if (startInputValue < 0) {
            setStartInputError(true)
            dispatch(setCounterErrorAC('start value must be positive'))
        } else if (startInputValue > maxInputValue) {
            setStartInputError(true)
            dispatch(setCounterErrorAC('start value more than max'))
        } else if (startInputValue === maxInputValue) {
            setStartInputError(true)
            dispatch(setCounterErrorAC('values are equal'))
        } else if (maxInputValue !== maxCounter || startInputValue !== startCounter) {
            dispatch(setCounterErrorAC('press set'))
            setStartInputError(false)
        } else {
            dispatch(setCounterErrorAC(''))
            setStartInputError(false)
        }

        if (maxInputValue < 0) {
            setMaxInputError(true)
            dispatch(setCounterErrorAC('max value must be positive'))
        } else if (maxInputValue < startInputValue) {
            setMaxInputError(true)
            dispatch(setCounterErrorAC('max value lower than start'))
        } else if (maxInputValue === startInputValue) {
            setMaxInputError(true)
            dispatch(setCounterErrorAC('values are equal'))
        } else if (maxInputValue !== maxCounter || startInputValue !== startCounter) {
            dispatch(setCounterErrorAC('press set'))
            setMaxInputError(false)
        } else {
            dispatch(setCounterErrorAC(''))
            setMaxInputError(false)
        }
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

