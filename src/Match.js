
const states = {
    RUNNING: 'running',
    WON: 'won',
    GAME_OVER: 'gameOver'
}

const Match = ({number, plays, duration, mode, state}) => {
    let totalSeconds = duration/1000
    let minutes = Math.floor(totalSeconds/60)
    let seconds = Math.round(totalSeconds % 60)
    let visualDuration = `${minutes}m ${seconds}s`
    console.log(state)
    return (
        <div className="match">
            <div className="front">
                <div className="number">
                    MATCH #{number}
                </div>
                <div>
                    <b>mode</b>: {mode}
                </div>
                <div>
                    <b>moves</b>: {plays.length} - {visualDuration}
                </div>
            </div>
            <b>Result</b>: <span className="result back">{ state === states.GAME_OVER ? '🙁 ' : '😊' }</span>
        </div>
    )
}

export default Match
