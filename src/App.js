import './App.css';
import { useState, useEffect } from 'react';
import GameManager from './GameManager.jsx';
import axios from 'axios'

const userid = localStorage.getItem('user-id')

function App() {

const [showProfileDialog, setShowProfileDialog] = useState(false)
const [userName, setUserName] = useState('')
const [started, setStarted] = useState(false)

useEffect( () => {
    setStarted(true)
}, [])

useEffect( () => {
    if (userid) {
        axios.get('http://localhost:8080/api/name', {
            headers: {
                'User-id': userid
            }
        }).then( response => {
            console.log('response', response)
            if (response.data.name) {
                setUserName(response.data.name)
            }
        })
    }
}, [started])

function showProfile() {
    setShowProfileDialog(true)
}

function saveName(ev) {
    if (ev.target.value !== '') {
        setUserName(ev.target.value)
    }
}

useEffect(() => {
   if (showProfileDialog) {
        document.querySelector('input.user-name').focus()
        document.querySelector('input.user-name').select()
   }
}, [showProfileDialog])

function handleKeyup(ev) {
    if (ev.keyCode === 13) {
        closeDialog()
    }
}

async function closeDialog() {
    setShowProfileDialog(false)
    let data = new FormData()
    data.append('name', userName)
    axios.post('http://localhost:8080/api/setname', data, {
            headers: {
                'User-id': userid,
            }
        })
        .then( response => {
            console.log('response', response)
            if (response.headers['user-id']) {
                localStorage.setItem('user-id', response.headers['user-id'])
            }
        })
        .catch ( error => {
            console.log('error', error)
        })
}

return (
    <>
        <header>
            <div className="profile">
                { userName }
                <div onClick={showProfile}>
                    <img alt="user-profile" src="/profile-user.png" />
                </div>
            </div>
            <div className="title">
                Minesweeper
            </div>
        </header>
        <div className="App">
            <GameManager userid={userid}/>
        </div>
        {showProfileDialog && <div className="profile-dialog">
            <div className="dialog-content">
                <input
                    className="user-name"
                    placeholder="Enter your name"
                    type="text"
                    max-length="32"
                    value={userName}
                    onChange={saveName}
                    onKeyUp={handleKeyup}
                />
                <div className="button-holder">
                    <input type="button" value="save" onClick={closeDialog}/>
                </div>
                <div onClick={() => { setShowProfileDialog(false) }} className="cancel-button">
                    <img alt="cancel" src="/cancel.png" />
                </div>
            </div>
        </div>}
    </>
);
}

export default App;
