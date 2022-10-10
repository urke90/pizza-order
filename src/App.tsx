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

            console.log('user in APP', user);

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
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable
            />
            {pathname !== '/login' && <Header />}
            <div className="app__container">
                <RoutesComponent />
            </div>
            {pathname !== '/login' && <Footer />}
        </div>
    );
};

export default App;

/**
 * https://fkhadra.github.io/react-toastify/installation
 * https://www.npmjs.com/package/react-toastify
 * https://www.geeksforgeeks.org/reactjs-toast-notification/
 * https://www.youtube.com/watch?v=7kNLXE0hixM ---- useEffetc Jack Harrington
 * https://www.youtube.com/watch?v=dH6i3GurZW8 ---- code splitting Jack Harrington
 * https://www.youtube.com/watch?v=QQYeipc_cik --- useEffect
 * https://github.com/reactjs/react-transition-group
 */

// redux reselect

/**
 * https://dev.to/aspnxdd/react-animation-ondestroy-removed-from-the-dom-53pd
 * https://stackoverflow.com/questions/33424138/how-to-remove-a-div-with-fade-out-effect-in-javascript
 * https://www.geeksforgeeks.org/how-to-fade-the-removal-of-a-dom-element-using-css-and-javascript/
 * https://bitcoden.com/answers/add-animation-or-transition-to-element-when-removed-from-dom
 * https://blog.bitsrc.io/how-to-speed-up-data-heavy-react-components-afe18d17b28b
 */
