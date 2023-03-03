import React, { FC } from 'react';
import { Button } from '../Button/Button';
import { Display } from '../Display/Display';
import s from './../../App.module.css'

type PropsType = {
    counter: number
    counterError: string
    maxCounter: number
    minCounter: number
    incHandler: () => void
    resetHandler: () => void
}

export const Counter: FC<PropsType> = ({
    counter,
    counterError,
    maxCounter,
    minCounter,
    incHandler,
    resetHandler,

}) => {

    const displayClass = `
    ${s.display} 
    ${counterError || s.counterDisplay} 
    ${(counter >= maxCounter && !counterError ? ' ' + s.red : '')}
    `

    return (
        <>
            <Display className={displayClass}>
                {counterError || counter}
            </Display>

            <div className={s.buttons}>

                <Button
                    onClick={incHandler}
                    disabled={counter >= maxCounter || Boolean(counterError)}
                    className={s.button}
                >INC</Button>

                <Button
                    onClick={resetHandler}
                    disabled={counter <= minCounter || Boolean(counterError)}
                    className={s.button}
                >RESET</Button>

            </div>

        </>

    );
};

