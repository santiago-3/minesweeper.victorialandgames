import { useState, useEffect } from 'react'
import Game from './Game.jsx'
import ConfirmationDialog from './ConfirmationDialog.js'
import Match from './Match.js'

const modeNames = {
    BEGINNER : 'beginner',
    INTERMEDIATE : 'intermediate',
    ADVANCED : 'advanced',
}

const modes = {
    [modeNames.BEGINNER]:     { width: 9,  height: 9,  mines: 10 },
    [modeNames.INTERMEDIATE]: { width: 16, height: 16, mines: 40 },
    [modeNames.ADVANCED]:     { width: 30, height: 16, mines: 99 },
}

function GameManager() {

    let [showDialog, setShowDialog] = useState(false)
    let [cMode, setCMode]           = useState(modeNames.BEGINNER)
    let [mode, setMode]             = useState(modeNames.BEGINNER)
    let [gameKey, setGameKey]       = useState(1)
    let [width, setWidth]           = useState(9)
    let [height, setHeight]         = useState(9)
    let [totalMines, setTotalMines] = useState(10)
    let [matches, setMatches]       = useState([])

    let [selectedMatch, setSelectedMatch] = useState(0)


    useEffect( () => {
        setGameKey(g => g+1)
    }, [totalMines])

    useEffect( () => {
        setWidth(modes[mode].width)
        setHeight(modes[mode].height)
        setTotalMines(modes[mode].mines)
    }, [mode])

    useEffect( () => {
        setSelectedMatch(matches.length-1)
    }, [matches])

    function addMatch(match) {
        match.mode = mode
        setMatches(matches.concat(match))
    }

    function confirmMode() {
        setMode(cMode)
        setShowDialog(false)
    }

    function reject() {
        setShowDialog(false)
    }

    function setQuestion(candidateMode) {
        setCMode(candidateMode)
        setShowDialog(true)
    }

    let visualMatches = matches.map( (match,index) => {
        return <Match
                key={index}
                plays={match.plays}
                duration={match.duration}
                mode={match.mode}
                state={match.state}
                number={index+1}
                selected={index == selectedMatch}
                onClick={() => { setSelectedMatch(index) }}
            />
    })

    return (
        <>
            <div className="content">
                <div className="column-left">
                        <button 
                            className={mode === modeNames.BEGINNER ? 'selected' : ''}
                            onClick={() => {setQuestion(modeNames.BEGINNER)}}
                        >
                            Beginner
                        </button>
                        <button
                            className={mode === modeNames.INTERMEDIATE ? 'selected' : ''}
                            onClick={() => {setQuestion(modeNames.INTERMEDIATE)}}
                        >
                            Intermediate
                        </button>
                        <button
                            className={mode === modeNames.ADVANCED ? 'selected' : ''}
                            onClick={() => {setQuestion(modeNames.ADVANCED)}}
                        >
                            Advanced
                        </button>
                        <div>
                            <button onClick={() => { setGameKey(gameKey+1) }}>
                                Restart
                            </button>
                        </div>
                    <div className="matches">
                        {visualMatches.reverse()}
                    </div>
                </div>
                <main>
                    <Game width={width} height={height} totalMines={totalMines} key={gameKey} addMatch={addMatch}/>
                </main>
            </div>
            {
                showDialog && <ConfirmationDialog 
                    question="Do you wish to quit this game and start a new one?"
                    confirmAction={confirmMode}
                    reject={reject}
                />
            }
        </>
    )
}

export default GameManager
