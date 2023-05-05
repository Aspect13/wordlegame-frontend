import {useState, ChangeEvent, useRef, SyntheticEvent, useEffect, RefObject} from "react";
import LetterBox from "./LetterBox";
import {useDispatch, useSelector} from "react-redux";
import {submit} from "../reducers/wordleSlice";
import {RootState} from "../reducers/store";

interface RowProps {
    rowNum: number,
}


const AttemptRow = ({rowNum}: RowProps) => {
    const [word, setWord] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const wordInput: RefObject<HTMLInputElement> = useRef(null)
    const dispatch = useDispatch()
    const {activeRow, answer, attempts} = useSelector((state: RootState) => state.wordle)
    const wordLength = answer.length

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value)
    }

    const handleWinGame = () => {
        alert(`Wow! You won! It took ${rowNum + 1}/${attempts} attempts`)
    }
    const handleLooseGame = () => {
        alert('You lost. Sorry')
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        if (word.length === wordLength) {
            console.log('Submitted', word)
            dispatch(submit(word))
            if (word === answer) {
                handleWinGame()
            } else if (attempts === rowNum + 1) {
                handleLooseGame()
            }
        }
    }

    const [isDisabled, setIsDisabled] = useState(activeRow !== rowNum)
    useEffect(() => {
        setIsDisabled(activeRow !== rowNum)
        setIsSubmitted(activeRow > rowNum)
    }, [activeRow, rowNum])

    useEffect(() => {
        !isDisabled && wordInput.current?.focus()
    }, [isDisabled])

    useEffect(() => {
        setWord('')
    }, [answer])

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <label
                style={{
                    display: 'inline-flex',
                    zIndex: 100
                }}>
                {[...answer].map((i, index) => {
                    const letter = word.at(index)?.toLowerCase() || ''
                    return (
                        <LetterBox
                            key={index}
                            letter={letter}
                            isDisabled={isDisabled}
                            isSubmitted={isSubmitted}
                            isInPosition={i === letter as string}
                            isInAnswer={answer.toLowerCase().includes(letter as string)}
                        />
                    )
                })}
                <input type={"text"} maxLength={wordLength}
                       value={word} onChange={handleInputChange}
                       ref={wordInput}
                       style={{width: 0, height: 0, opacity: 0, position: 'absolute', zIndex: 0}}
                       disabled={isDisabled}
                       autoFocus={!isDisabled}
                />
            </label>
        </form>
    )
}

export default AttemptRow