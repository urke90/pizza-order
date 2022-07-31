import { useState } from 'react';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { FcGoogle } from 'react-icons/fc';
import { useLogin } from 'hooks/useLogin';

import Button from 'shared/form/Button';

import './Login.scss';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
    const [isSignUpMode, setSignUpMode] = useState(false);
    const { handleGoogleSignIn } = useLogin();
    const navigate = useNavigate();

    const toggleAuthMode = () => setSignUpMode(!isSignUpMode);

    const signupUsers = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                'test@gmail.com',
                '123123'
            );
            navigate('/', { replace: true });
            console.log('res', res);
        } catch (error) {
            console.log('error with creacte', error);
        }
    };

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(
                auth,
                'test@gmail.com',
                '123123'
            );
            console.log('res', res);

            navigate('/', { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = () => {
        // TODO handle login with EMAIL and PW
    };

    return (
        <div className="login">
            <div className="login__window">
                <h1 className="login__heading">
                    {isSignUpMode ? 'Sign up' : 'Sign in'}
                </h1>
                <form onSubmit={signupUsers} className="login__form">
                    <div className="login__form-control">
                        <label className="login__label" htmlFor="email">
                            Email
                        </label>
                        <input type="email" id="email" placeholder="Email" />
                    </div>
                    <div className="login__form-control">
                        <label className="login__label" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="password"
                        />
                    </div>
                    <Button
                        onClick={() => {}}
                        type="submit"
                        secondary
                        width="100%"
                    >
                        {isSignUpMode ? 'sign up' : 'sign in'}
                    </Button>
                    {/* <GoogleButton onClick={handleGoogleSignIn} /> */}
                    <p className="login__text">
                        Already have an account?{' '}
                        <span className="login__mode" onClick={toggleAuthMode}>
                            {isSignUpMode
                                ? 'Sign in instead'
                                : 'Sign up instead'}
                        </span>
                    </p>

                    <div className="login__btn-wrapper">
                        <Button
                            type="button"
                            onClick={handleGoogleSignIn}
                            width="100%"
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center'
                                }}
                            >
                                <span
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >
                                    sign in with google
                                </span>
                                <FcGoogle size={18} />
                            </div>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;
