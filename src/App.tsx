import { useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable
            />
            {pathname !== '/login' && <Header />}
            <RoutesComponent />
            {pathname !== '/login' && <Footer />}
        </div>
    );
};

export default App;

/**
 * https://fkhadra.github.io/react-toastify/installation
 * https://www.npmjs.com/package/react-toastify
 * https://www.geeksforgeeks.org/reactjs-toast-notification/
 */
