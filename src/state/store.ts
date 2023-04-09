import { combineReducers, legacy_createStore } from "redux"
import { COUNTER_STORAGE, MAX_COUNTER_STORAGE, START_COUNTER_STORAGE, counterReducer } from "./counterReducer"

const rootReducer = combineReducers({
    display: counterReducer
})

export const store = legacy_createStore(rootReducer)

export type StoreType = ReturnType<typeof rootReducer>

store.subscribe(() => {
    const display = store.getState().display
    const startCounter = display.startCounter
    const maxCounter = display.maxCounter
    const counter = display.counter

    localStorage.setItem(START_COUNTER_STORAGE, JSON.stringify(startCounter))
    localStorage.setItem(MAX_COUNTER_STORAGE, JSON.stringify(maxCounter))
    localStorage.setItem(COUNTER_STORAGE, JSON.stringify(counter))
})