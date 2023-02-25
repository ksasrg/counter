import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Display } from './components/Display/Display';
import { Button } from './components/Button/Button';
import s from './App.module.css'

function App() {

  const minCounter = 0
  const maxCounter = 5

  const [counter, setCounter] = useState<number>(minCounter)

  const incHandler = () => {
    if (counter < maxCounter) {
      setCounter(counter => counter + 1)
    }
  }

  const resetHandler = () => {
    setCounter(minCounter)
  }



  return (
    <div className={s.counter}>

      <Display className={s.display + (counter >= maxCounter ? ' ' + s.red : '')}>
        {counter}
      </Display>

      <div className={s.buttons}>

        <Button
          onClick={incHandler}
          disabled={counter >= maxCounter}
          className={s.button}
        >
          INC
        </Button>

        {/* <button
          onClick={incHandler}
          disabled={counter >= maxCounter}
          className={s.button}
        >
          INC
        </button> */}

        <Button
          onClick={resetHandler}
          disabled={counter <= minCounter}
          className={s.button}
        >
          RESET
        </Button>

      </div>
    </div>
  );
}

export default App;
