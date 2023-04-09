import { Button } from '../Button/Button';
import { Display } from '../Display/Display';
import s from './../../App.module.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { StoreType } from '../../state/store';
import { CounterType, incCounterAC, resetCounterAC } from '../../state/counterReducer';

export const Counter = () => {
    const dispatch = useDispatch()
    const display = useSelector<StoreType, CounterType>(state => state.display)
    const counter = display.counter
    const maxCounter = display.maxCounter
    const minCounter = display.startCounter
    const counterError = display.counterError

    const displayClass = `
    ${s.display} 
    ${counterError || s.counterDisplay} 
    ${(counter >= maxCounter && !counterError ? ' ' + s.red : '')}
    `

    const incHandler = () => {
        dispatch(incCounterAC())
    }

    const resetHandler = () => {
        dispatch(resetCounterAC())
    }

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

