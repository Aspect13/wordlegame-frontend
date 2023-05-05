import {useEffect, useState} from 'react'
import WordleSpace from "./components/WordleSpace";
import WordleKeyboard from "./components/WordleKeyboard";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./reducers/store";
import {changeAnswer, changeAttempts} from "./reducers/wordleSlice";

const App = () => {
    const dispatch = useDispatch()
    const {answer, attempts} = useSelector((state: RootState) => state.wordle)
    const setAnswer = (value: string) => dispatch(changeAnswer(value))
    const setAttempts = (value: number) => dispatch(changeAttempts(value))

    useEffect(() => {
        const resp = fetch('/').then(async resp => {
            if (resp.ok) {
                // const data = await resp.json()
                setAnswer('mourchik')
            }
        })
    }, [])
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 16px)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '10px 0'
            }}>
                <input type={"text"} onChange={e => setAnswer(e.target.value)} value={answer} style={{marginRight: '10px'}}/>
                <input type={"number"} onChange={e => setAttempts(parseInt(e.target.value))} value={attempts}/>
            </div>
            <WordleSpace attempts={attempts}/>
            <WordleKeyboard />
        </div>
    )
}

export default App