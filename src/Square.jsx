function Square({
        rowNum,
        squareNum,
        hasMine,
        surroundingMines,
        revealed,
        hasFlag,
        action,
        rightAction,
        lost,
        gameOver
    }) {
    let classes = ["square"]
    let number = <></>
    let img = <></>
    if (hasFlag) {
        revealed = false
        if (gameOver && !hasMine){
            classes.push("crossedFlag")
            img = <img alt="wrong-mine" src="/flag-crossed.png" />
        }
        else {
            classes.push("hasFlag")
            img = <img alt="probable-mine" src="/flag.png" />
        }
    }
    if (revealed) {
        classes.push("revealed")
        if (hasMine) {
            classes.push("hasMine")
            if (lost) {
                classes.push("lost")
            }
            img = <img alt="mine" src="/mine.png" />
        }
        else if (surroundingMines > 0){
            number = <div className="display">{surroundingMines}</div>
            classes.push(`mines-${surroundingMines}`)
        }
    }
    return (
        <div className={ classes.join(' ') } onClick={action} onContextMenu={rightAction}>
            {number}
            {img}
        </div>
    )
}

export default Square
