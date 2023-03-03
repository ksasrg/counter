import React, { useEffect, useState } from 'react';
import './App.css';
import s from './App.module.css'
import { Counter } from './components/Counter/Counter';
import { Settings } from './components/Settings/Settings';

const START_COUNTER_STORAGE = 'counter_start'
const MAX_COUNTER_STORAGE = 'counter_max'
const COUNTER_STORAGE = 'counter'

function App() {

  const [startCounter, setStartCounter] = useState<number>(() => getInitFromLS(START_COUNTER_STORAGE, 0))
  const [maxCounter, setMaxCounter] = useState<number>(() => getInitFromLS(MAX_COUNTER_STORAGE, 5))
  const [counter, setCounter] = useState<number>(() => getInitFromLS(COUNTER_STORAGE, startCounter))
  const [counterError, setCounterError] = useState<string>('')

  function getInitFromLS(key: string, defaultValue: number) {
    const value = localStorage.getItem(key)
    if (value) {
      // const newvalue = parseInt(value)
      const newvalue = JSON.parse(value)
      if (newvalue) return newvalue
    }
    return defaultValue
  }

  useEffect(() => {
    localStorage.setItem(START_COUNTER_STORAGE, JSON.stringify(startCounter))
    localStorage.setItem(MAX_COUNTER_STORAGE, JSON.stringify(maxCounter))
    localStorage.setItem(COUNTER_STORAGE, JSON.stringify(counter))
  }, [startCounter, maxCounter, counter])

  const incHandler = () => {
    if (counter < maxCounter) {
      setCounter(counter => counter + 1)
    }
  }

  const resetHandler = () => {
    setCounter(startCounter)
  }

  return (
    <>
      <div className={s.page}>
        <div className={s.counter}>

          <Settings
            startCounter={startCounter}
            maxCounter={maxCounter}
            setStartCounter={setStartCounter}
            setMaxCounter={setMaxCounter}
            setCounter={setCounter}
            setCounterError={setCounterError}
            counterError={counterError}
          />

        </div>
        <div className={s.counter}>

          <Counter
            counter={counter}
            counterError={counterError}
            minCounter={startCounter}
            maxCounter={maxCounter}
            incHandler={incHandler}
            resetHandler={resetHandler}
          />

        </div>
      </div>


    </>
  );
}

export default App;


