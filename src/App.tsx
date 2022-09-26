import { useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebase/firebase';
import { useAppDispatch } from 'hooks/use-redux';
import { saveUser, removeUser } from 'redux/reducers/auth-reducer';
import RoutesComponent from 'router/Routes';

import Header from 'layout/Header';
import Footer from 'layout/Footer';

import './App.scss';

const App = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // user is logged in

            dispatch(
                saveUser({
                    uid: user.uid,
                    isAuth: true
                })
            );
        } else {
            // user is signed out
            dispatch(removeUser());
        }
    });

    return (
        <div className="app">
            {pathname !== '/login' && <Header />}
            <RoutesComponent />
            {pathname !== '/login' && <Footer />}
        </div>
    );
};

export default App;
