import { useState } from 'react';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { FcGoogle } from 'react-icons/fc';

import Button from 'shared/form/Button';

import './Login.scss';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
    const [isSignUpMode, setSignUpMode] = useState(false);
    const toggleAuthMode = () => setSignUpMode(!isSignUpMode);

    const navigate = useNavigate();

    const handleSubmit = () => {
        // TODO handle login with EMAIL and PW
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const fake = () => {
        console.log('radi button');
    };

    return (
        <div className="login">
            <div className="login__window">
                <h1 className="login__heading">
                    {isSignUpMode ? 'Sign up' : 'Sign in'}
                </h1>
                <form action="" className="login__form">
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
                        onClick={handleSubmit}
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
                        <Button type="button" onClick={fake} width="100%">
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
