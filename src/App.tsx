import './App.css';
import s from './App.module.css'
import { Counter } from './components/Counter/Counter';
import { Settings } from './components/Settings/Settings';

function App() {
  return (
    <>
      <div className={s.page}>
        <div className={s.counter}>
          <Settings />
        </div>
        <div className={s.counter}>
          <Counter />
        </div>
      </div>
    </>
  )
}

export default App;


