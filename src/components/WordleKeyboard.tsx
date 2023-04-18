import {useSelector} from "react-redux";
import {RootState} from "../reducers/store";
import LetterBox from "./LetterBox";


interface KeyboardRowProps {
    rowLetters: string,
    usedLetters: Array<string>,
    answer: string
}

const KeyboardRow = ({rowLetters, usedLetters, answer}: KeyboardRowProps) => {
    return (
        <div style={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center'
        }}>
            {[...rowLetters].map((i) =>
                <LetterBox
                    key={i}
                    letter={i}
                    isDisabled={true}
                    isSubmitted={usedLetters.includes(i)}
                    isInAnswer={false}
                    isInPosition={answer.includes(i)}
                />
            )}
        </div>
    )
}

const WordleKeyboard = () => {
    const {usedLetters, answer} = useSelector((state: RootState) => state.wordle)
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px 0'
        }}>
            {<KeyboardRow rowLetters={'qwertyuiop'} usedLetters={usedLetters} answer={answer}/>}
            {<KeyboardRow rowLetters={'asdfghjkl'} usedLetters={usedLetters} answer={answer}/>}
            {<KeyboardRow rowLetters={'zxcvbnm'} usedLetters={usedLetters} answer={answer}/>}
        </div>
    )
}

export default WordleKeyboard