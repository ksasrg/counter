export const START_COUNTER_STORAGE = 'counter_start'
export const MAX_COUNTER_STORAGE = 'counter_max'
export const COUNTER_STORAGE = 'counter'

function getFromLS(key: string, defaultValue: number) {
    const value = localStorage.getItem(key)
    if (value) {
        const newvalue = parseInt(value)
        // const newvalue = JSON.parse(value)
        if (newvalue) return newvalue
    }
    return defaultValue
}

const initState = {
    startCounter: getFromLS(START_COUNTER_STORAGE, 0),
    counter: getFromLS(COUNTER_STORAGE, getFromLS(START_COUNTER_STORAGE, 0)),
    maxCounter: getFromLS(MAX_COUNTER_STORAGE, 5),
    counterError: '',
}

export type CounterType = typeof initState

export const counterReducer = (state: CounterType = initState, action: ActionType): CounterType => {
    switch (action.type) {
        case 'INC-COUNTER':
            return { ...state, counter: state.counter + 1 }

        case 'RESET-COUNTER':
            return { ...state, counter: state.startCounter }

        case 'SET-COUNTER-ERROR':
            if (action.error === state.counterError) return state
            return { ...state, counterError: action.error }

        case 'SET-START-COUNTER':
            return { ...state, startCounter: action.startCounter }

        case 'SET-MAX-COUNTER':
            return { ...state, maxCounter: action.maxCounter }

        default:
            return state
    }
}

type ActionType = IncCounterActionType | ResetCounterActionType
    | SetCounterErrorActionType | SetStartCounterActionType | SetMaxCounterActionType

export type IncCounterActionType = ReturnType<typeof incCounterAC>
export const incCounterAC = () => { return { type: 'INC-COUNTER' } as const }

export type ResetCounterActionType = ReturnType<typeof resetCounterAC>
export const resetCounterAC = () => { return { type: 'RESET-COUNTER' } as const }

export type SetCounterErrorActionType = ReturnType<typeof setCounterErrorAC>
export const setCounterErrorAC = (error: string) => { return { type: 'SET-COUNTER-ERROR', error } as const }

export type SetStartCounterActionType = ReturnType<typeof setStartCounterAC>
export const setStartCounterAC = (startCounter: number) => {
    return { type: 'SET-START-COUNTER', startCounter } as const
}

export type SetMaxCounterActionType = ReturnType<typeof setMaxCounterAC>
export const setMaxCounterAC = (maxCounter: number) => {
    return { type: 'SET-MAX-COUNTER', maxCounter } as const
}