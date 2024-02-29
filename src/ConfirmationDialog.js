const ConfirmationDialog = ({question, confirmAction, reject}) => {
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

export default ConfirmationDialog
