import AttemptRow from "./AttemptRow";

type WordleSpaceProps = {
    attempts: number
}
const WordleSpace = ({attempts}: WordleSpaceProps) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
            {Array.from({length: attempts}).map((_, index) =>
                <AttemptRow
                    key={index}
                    rowNum={index}
                />
            )}
        </div>
    )
}

export default WordleSpace
