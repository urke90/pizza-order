import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useLogin } from 'hooks/useLogin';

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
                        <label className="login__label" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="login__form-control">
                        <label className="login__label" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
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
