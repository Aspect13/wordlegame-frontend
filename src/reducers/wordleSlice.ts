import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface WordleState {
    activeRow: number,
    attempts: number,
    answer: string,
    usedLetters: Array<string>
}

// Define the initial state using that type
const initialState: WordleState = {
    activeRow: 0,
    attempts: 6,
    answer: '',
    usedLetters: []
}

// enableMapSet()

export const wordleSlice = createSlice({
    name: 'wordle',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        submit: (state, action: PayloadAction<string>) => {
            state.activeRow += 1
            state.usedLetters = Array.from(new Set([...state.usedLetters, ...action.payload.toLowerCase()]))
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        changeAnswer: (state, action: PayloadAction<string>) => {
            state.answer = action.payload
        },
        changeAttempts: (state, action: PayloadAction<number>) => {
            state.attempts = action.payload
        },
    },
})

export const { submit, changeAnswer, changeAttempts } = wordleSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default wordleSlice.reducer