import { useLocation } from 'react-router-dom';

import RoutesComponent from 'router/Routes';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import Header from 'layout/Header';

import './App.scss';

function App() {
    const { pathname } = useLocation();

    const bla = useAppSelector((store) => {
        console.log('store', store);
    });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('user SIGN IN', user);

            // user is logged in
            // console.log('user imaaaa', user);
        } else {
            // user is signed out

            console.log('signed out', user);
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
