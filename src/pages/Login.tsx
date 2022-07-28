import { useState } from 'react';

import Button from 'shared/form/Button';

import './Login.scss';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
    const [isSignUpMode, setSignUpMode] = useState(false);

    const toggleAuthMode = () => setSignUpMode(!isSignUpMode);

    const handleSubmit = () => {
        console.log('dasdasdas');
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
                        width={100}
                        height={30}
                        bgColor="dark"
                    >
                        {isSignUpMode ? 'SIGN UP' : 'SIGN IN'}
                    </Button>
                    <p className="login__text">
                        Already have an account?{' '}
                        <span className="login__mode" onClick={toggleAuthMode}>
                            {isSignUpMode
                                ? 'Sign in instead'
                                : 'Sign up instead'}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default Login;
