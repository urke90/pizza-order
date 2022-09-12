import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLogin } from 'hooks/useLogin';

import Input from 'shared/form/Input';
import Button from 'shared/form/Button';

import './Login.scss';

const Login: React.FC = () => {
    const [isSignUpMode, setSignUpMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        handleGoogleSignIn,
        handleSignInWithCredentials,
        handleSignUpWithCredentials
    } = useLogin();

    const toggleAuthMode = () => setSignUpMode((prevState) => !prevState);

    const handleSubmit = isSignUpMode
        ? (e: React.FormEvent<HTMLFormElement>) =>
              handleSignUpWithCredentials(e, email, password, name)
        : (e: React.FormEvent<HTMLFormElement>) =>
              handleSignInWithCredentials(e, email, password);

    return (
        <div className="login">
            <div className="login__window">
                <h1 className="login__heading">
                    {isSignUpMode ? 'Sign up' : 'Sign in'}
                </h1>
                <form onSubmit={handleSubmit} className="login__form">
                    {isSignUpMode && (
                        <div className="login__form-control">
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                label="Name"
                                placeholder="Name"
                                onChange={setName}
                                initValue={name}
                            />
                        </div>
                    )}

                    <div className="login__form-control">
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="Email"
                            onChange={setEmail}
                            initValue={email}
                        />
                    </div>
                    <div className="login__form-control">
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="Password"
                            onChange={setPassword}
                            initValue={password}
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
                        <span className="login__mode" onClick={toggleAuthMode}>
                            {isSignUpMode
                                ? 'Sign in instead'
                                : 'Sign up instead'}
                        </span>
                    </p>

                    <div className="login__button-wrapper">
                        <Button
                            type="button"
                            onClick={handleGoogleSignIn}
                            width="100%"
                        >
                            <div className="login__button-icon">
                                <span>sign in with google</span>
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
