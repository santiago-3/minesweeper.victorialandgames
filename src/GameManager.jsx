import { useState, useEffect } from 'react'
import Game from './Game.jsx'
// import ConfirmationDialog from './ConfirmationDialog.jsx'

function ConfirmationDialog ({question, confirmAction, reject}) {
    return (
        <div className="dialog-area">
            <div className="dialog-box">
                <label>{question}</label>
                <div className="buttons">
                    <button className="yes" onClick={confirmAction}>Yes</button>
                    <button className="no" onClick={reject}>No</button>
                </div>
            </div>
        </div>
    )
}

function GameManager() {

    const modes = {
        BEGINNER: 0,
        INTERMEDIATE: 1,
        ADVANCED: 2,
    }

    let [mode, setMode]             = useState(modes.BEGINNER)
    let [showDialog, setShowDialog] = useState(false)
    let [width, setWidth]           = useState(9)
    let [height, setHeight]         = useState(9)
    let [totalMines, setTotalMines] = useState(10)
    let [gameKey, setGameKey]       = useState(1)

    let [confirmAction, setConfirmAction] = useState(null)

    useEffect( () => {
        console.log('modes changed!')
        switch(mode) {
            case modes.BEGINNER: setWidth(9); setHeight(9); setTotalMines(10); break;
            case modes.INTERMEDIATE: setWidth(16); setHeight(16); setTotalMines(40); break;
            case modes.ADVANCED: setWidth(30); setHeight(16); setTotalMines(99); break;
            default: break;
        }
    }, [mode])

    useEffect( () => {
        console.log('1')
        if (confirmAction !== null) {
            console.log('2')
            setShowDialog(true)
        }
    }, [confirmAction])

    useEffect( () => {
        setGameKey(gameKey+1)
    }, [width, height, totalMines])

    function reject() {
        setShowDialog(false)
        setConfirmAction(null)
    }

    return (
        <>
            <div className="content">
                <div className="column-left">
                        <button 
                            className={mode === modes.BEGINNER ? 'selected' : ''}
                            onClick={ () => {setConfirmAction(() => setMode(modes.BEGINNER))} }
                        >
                            Beginner
                        </button>
                        <button
                            className={mode === modes.INTERMEDIATE ? 'selected' : ''}
                            onClick={ () => {setConfirmAction(() => { console.log('por qué me ejecuto?') })} }
                        >
                            Intermediate
                        </button>
                        <button
                            className={mode === modes.ADVANCED ? 'selected' : ''}
                            onClick={ () => {setConfirmAction(() => setMode(modes.ADVANCED))} }
                        >
                            Advanced
                        </button>
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
                    confirmAction={confirmAction}
                    reject={reject}
                />
            }
        </>
    )
}

export default GameManager
