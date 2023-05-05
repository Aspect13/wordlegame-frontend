import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface WordleState {
    activeRow: number,
    attempts: number,
    answer: string,
    usedLetters: Array<string>,
    snipedLetters: Array<string>,
}

// Define the initial state using that type
const initialState: WordleState = {
    activeRow: 0,
    attempts: 6,
    answer: '',
    usedLetters: [],
    snipedLetters: []
}

// enableMapSet()

export const wordleSlice = createSlice({
    name: 'wordle',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        submit: (state, action: PayloadAction<string>) => {
            state.activeRow += 1
            const userSubmit = action.payload.toLowerCase()
            state.usedLetters = Array.from(new Set([...state.usedLetters, ...userSubmit]))
            const lettersInPosition: string[] = [...state.answer].filter((i: string, index: number) => {
                return i === userSubmit.at(index) as string
            })
            state.snipedLetters = Array.from(new Set([...state.snipedLetters, ...lettersInPosition]))
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        changeAnswer: (state, action: PayloadAction<string>) => {
            state.answer = action.payload
            state.activeRow = 0
            state.usedLetters = []
            state.snipedLetters = []
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