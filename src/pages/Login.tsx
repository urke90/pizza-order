import { useState } from 'react';
import './Login.scss';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
    const [isSignUpMode, setSignUpMode] = useState(false);

    const toggleAuthMode = () => setSignUpMode(!isSignUpMode);

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
                    <button>submit</button>
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
