import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLogin } from 'hooks/useLogin';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Input from 'shared/form/Input';
import Button from 'shared/form/Button';

import './Login.scss';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
    const [isSignUpMode, setSignUpMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        handleGoogleSignIn,
        handleSignInWithCredentials,
        handleSignUpWithCredentials
    } = useLogin();

    const toggleAuthMode = () => setSignUpMode((prevState) => !prevState);

    const handleSubmit = isSignUpMode
        ? handleSignUpWithCredentials
        : handleSignInWithCredentials;

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
        <div className="login">
            <div className="login__window">
                <h1 className="login__heading">
                    {isSignUpMode ? 'Sign up' : 'Sign in'}
                </h1>
                <form
                    onSubmit={(e) => handleSubmit(e, email, password)}
                    className="login__form"
                >
                    <div className="login__form-control">
                        <Input
                            textarea
                            id="email"
                            type="email"
                            name="email"
                            labelText="Email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="login__form-control">
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            labelText="Password"
                            placeholder="Password"
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
