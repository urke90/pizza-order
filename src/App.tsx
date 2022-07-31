import { Routes, Route, useLocation } from 'react-router-dom';

import Main from 'pages/Main';
import Login from 'pages/Login';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import Header from 'layout/Header';

import './App.scss';

function App() {
    const { pathname } = useLocation();

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // user is logged in
            // console.log('user imaaaa', user);
        } else {
            // user is signed out
        }
    });

    return (
        <div>
            {pathname !== '/login' && <Header />}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
