interface LetterBoxProps {
    letter: string | undefined,
    isDisabled: boolean,
    isSubmitted: boolean,
    isInAnswer: boolean,
    isInPosition: boolean,
}

const LetterBox = ({letter, isDisabled, isSubmitted, isInAnswer, isInPosition}: LetterBoxProps) => {
    const styleExt = {
        backgroundColor: 'initial',
        color: 'initial'
    }
    if (isSubmitted) {
        if (isInPosition) {
            styleExt.backgroundColor = 'green'
            styleExt.color = '#fff'
        } else if (isInAnswer) {
            styleExt.backgroundColor = 'yellow'
        } else {
            styleExt.backgroundColor = 'gray'
            styleExt.color = '#000'
        }
    } else if (isDisabled) {
        styleExt.backgroundColor = '#ccc'
    }

    return (
        <button style={{
            minWidth: '50px',
            minHeight: '50px',
            border: '1px solid black',
            borderRadius: '5px',
            margin: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'xx-large',
            ...styleExt
        }}>
            {letter?.toUpperCase()}
        </button>
    )
}

export default LetterBox