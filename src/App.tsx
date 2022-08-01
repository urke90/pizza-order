import { Routes, Route, useLocation } from 'react-router-dom';

import RoutesComponent from 'router/Routes';
import Main from 'pages/Main';
import Login from 'pages/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import Header from 'layout/Header';
import Orders from 'pages/Orders';
import CustomPizza from 'pages/CustomPizza';

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
            {/* <Routes>
                <Route path="/" element={<Main />} />
                <Route path="login" element={<Login />} />
                <Route path="orders" element={<Orders />} />
                <Route path="custom-piza" element={<CustomPizza />} />
            </Routes> */}
            <RoutesComponent />
        </div>
    );
}

//https://forkify-api.herokuapp.com/

export default App;
