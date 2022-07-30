import { Routes, Route } from 'react-router-dom';

import Main from 'pages/Main';
import Login from 'pages/Login';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

import './App.scss';

function App() {
    const auth = getAuth();
    console.log('auth', auth);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('user imaaaa', user);
        } else {
            // user is signed out
        }
    });

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
