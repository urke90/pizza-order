import { useLocation } from 'react-router-dom';

import RoutesComponent from 'router/Routes';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import Header from 'layout/Header';

import './App.scss';

function App() {
    const { pathname } = useLocation();

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

            <RoutesComponent />
        </div>
    );
}

//https://forkify-api.herokuapp.com/

export default App;
