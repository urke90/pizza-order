import { useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebase/firebase';
import { useAppDispatch } from 'hooks/useRedux';
import { saveUser, removeUser } from 'redux/reducers/authReducer';
import RoutesComponent from 'router/Routes';

import Header from 'layout/Header';
import Footer from 'layout/Footer';

import './App.scss';

function App() {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // user is logged in

            console.log('user in APP COMPONENET', user);

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
        <div className="app__container">
            {pathname !== '/login' && <Header />}
            <RoutesComponent />
            {pathname !== '/login' && <Footer />}
        </div>
    );
}

//https://forkify-api.herokuapp.com/

export default App;
