import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLogin } from 'hooks/useLogin';
import { useForm } from 'hooks/useForm';
import { loginForm, signupForm } from 'util/form-data';

import Input from 'shared/form/Input';
import Button from 'shared/form/Button';
import LoadingSpinner from 'shared/ui/LoadingSpinner';

import './Login.scss';

const Login: React.FC = () => {
    const [isSignUpMode, setSignUpMode] = useState(false);
    const toggleAuthMode = () => setSignUpMode((prevState) => !prevState);
    const {
        handleGoogleSignIn,
        handleSignInWithCredentials,
        handleSignUpWithCredentials,
        isLoading
    } = useLogin();

    const { state, handleInputChange, setInputFields } = useForm(loginForm);
    const {
        formIsValid,
        inputs: { email, password }
    } = state;

    useEffect(() => {
        if (isSignUpMode) {
            setInputFields(signupForm);
        } else {
            setInputFields(loginForm);
        }
    }, [isSignUpMode, setInputFields]);

    // const handleSubmit = isSignUpMode
    //     ? (e: React.FormEvent<HTMLFormElement>) =>
    //           handleSignUpWithCredentials(e, email, password, name)
    //     : (e: React.FormEvent<HTMLFormElement>) =>
    //           handleSignInWithCredentials(e, email, password);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('state in LOGIN ', state);
    };

    return (
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            <section className="login">
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
                                    name="userName"
                                    label="Name"
                                    placeholder="Name"
                                    onChange={handleInputChange}
                                    value={state.inputs.name?.value || ''}
                                    isValid={
                                        state.inputs.name?.isValid || false
                                    }
                                    errorMessage="Name must be at least 3 characters long!"
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
                                isValid={email.isValid}
                                errorMessage="Email address is not valid!"
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
                                isValid={password.isValid}
                                errorMessage="Password must be at least 6 characters long!"
                            />
                        </div>
                        <Button
                            type="submit"
                            secondary
                            width="100%"
                            disabled={!formIsValid}
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
            </section>
        </>
    );
};

export default Login;
