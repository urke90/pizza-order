import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLogin } from 'hooks/useLogin';
import { useForm } from 'hooks/useForm';
import { IFormState } from 'ts/form';

import Input from 'shared/form/Input';
import Button from 'shared/form/Button';
import LoadingSpinner from 'shared/ui/LoadingSpinner';

import './Login.scss';

const loginFormSkelet: IFormState = {
    inputs: {
        name: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    },
    formIsValid: false
};

const Login: React.FC = () => {
    const [isSignUpMode, setSignUpMode] = useState(false);
    const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const {
        handleGoogleSignIn,
        handleSignInWithCredentials,
        handleSignUpWithCredentials,
        isLoading
    } = useLogin();
    const { state, handleInputChange } = useForm(loginFormSkelet);
    const {
        formIsValid,
        inputs: { email, password }
    } = state;

    const bla = email.value;

    const toggleAuthMode = () => setSignUpMode((prevState) => !prevState);

    // const handleSubmit = isSignUpMode
    //     ? (e: React.FormEvent<HTMLFormElement>) =>
    //           handleSignUpWithCredentials(e, email, password, name)
    //     : (e: React.FormEvent<HTMLFormElement>) =>
    //           handleSignInWithCredentials(e, email, password);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('state in LOGIN ', state);
    };

    useEffect(() => {
        console.log('bla', bla);
    }, [bla]);

    return (
        <>
            {isLoading && <LoadingSpinner asOverlay />}
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
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
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
                                onChange={handleInputChange}
                                value={email.value}
                                errorMessage="Email address is not correct!"
                            />
                        </div>
                        <div className="login__form-control">
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Password"
                                onChange={handleInputChange}
                                value={password.value}
                                // isValid={false}
                                errorMessage="Password must be at least 8 characters long!"
                            />
                        </div>
                        <Button
                            onClick={() => {}}
                            type="submit"
                            secondary
                            width="100%"
                            disabled={isLoading}
                        >
                            {isSignUpMode ? 'sign up' : 'sign in'}
                        </Button>
                        <p className="login__text">
                            <span
                                className="login__mode"
                                onClick={toggleAuthMode}
                            >
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
                                disabled={isLoading}
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
        </>
    );
};

export default Login;
