import { useState, useEffect } from 'react'
import Game from './Game.jsx'
import ConfirmationDialog from './ConfirmationDialog.js'

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

    useEffect( () => {
        setGameKey(g => g+1)
    }, [totalMines])

    useEffect( () => {
        setWidth(modes[mode].width)
        setHeight(modes[mode].height)
        setTotalMines(modes[mode].mines)
    }, [mode])

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
                        {/*
                        */}
                    {/*
                    <div className="param">
                        <div>
                            <label>Width</label>
                        </div>
                        <input
                            type="text"
                            placeholder="width"
                            value={width}
                            onChange={ (e) => { setWidth(e.target.value) }}
                        />
                    </div>
                    <div className="param">
                        <div>
                            <label>Height</label>
                        </div>
                        <input
                            type="text"
                            placeholder="height"
                            value={height}
                            onChange={ (e) => { setHeight(e.target.value) }}
                        />
                    </div>
                    <div className="param">
                        <div>
                            <label>Mines</label>
                        </div>
                        <input
                            type="text"
                            placeholder="total mines"
                            value={totalMines}
                            onChange={ (e) => { setTotalMines(e.target.value) }}
                        />
                    </div>
                    */}
                    <div>
                        <button onClick={() => { setGameKey(gameKey+1) }}>
                            Restart
                        </button>
                    </div>
                </div>
                <main>
                    <Game width={width} height={height} totalMines={totalMines} key={gameKey} />
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
