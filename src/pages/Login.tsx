import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { useLogin } from 'hooks/use-login';
import { useForm } from 'hooks/use-form';
import { loginForm, signupForm } from 'config/form.config';

import Input from 'shared/form/Input';
import Button from 'shared/form/Button';
import LoadingSpinner from 'shared/ui/LoadingSpinner';

import './Login.scss';

const Login: React.FC = () => {
    /**
     * HOOKS
     */
    const [isSignUpMode, setSignUpMode] = useState(false);
    const {
        handleGoogleSignIn,
        handleSignInWithCredentials,
        handleSignUpWithCredentials,
        handleFacebookSignIn,
        isLoading
    } = useLogin();
    const { formState, handleInputChange, setInputFields, handleInputBlur } =
        useForm(loginForm);

    const {
        formIsValid,
        inputs: { email, password, name }
    } = formState;

    const toggleAuthMode = () => setSignUpMode((prevState) => !prevState);

    useEffect(() => {
        if (isSignUpMode) {
            setInputFields(signupForm);
        } else {
            setInputFields(loginForm);
        }
    }, [isSignUpMode, setInputFields]);

    const handleSubmit = isSignUpMode
        ? (e: React.FormEvent<HTMLFormElement>) =>
              handleSignUpWithCredentials(
                  e,
                  email.value,
                  password.value,
                  name.value
              )
        : (e: React.FormEvent<HTMLFormElement>) =>
              handleSignInWithCredentials(e, email.value, password.value);

    if (isLoading) {
        return <LoadingSpinner asOverlay />;
    }

    return (
        <section className="login">
            <div className="login__window">
                <h1 className="login__heading">
                    {isSignUpMode ? 'Sign up' : 'Sign in'}
                </h1>
                <form onSubmit={handleSubmit} className="login__form">
                    {isSignUpMode && (
                        <div className="login__form-control">
                            <Input
                                type="text"
                                name="userName"
                                label="Name"
                                placeholder="Name"
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                value={formState.inputs.name?.value || ''}
                                isValid={
                                    formState.inputs.name?.isValid || false
                                }
                                isTouched={
                                    formState.inputs.name?.isTouched || false
                                }
                                errorMessage="Name must be at least 3 characters long!"
                            />
                        </div>
                    )}
                    <div className="login__form-control">
                        <Input
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            value={email.value}
                            isValid={email.isValid}
                            isTouched={email.isTouched}
                            errorMessage="Email address is not valid!"
                        />
                    </div>
                    <div className="login__form-control">
                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="Password"
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            value={password.value}
                            isValid={password.isValid}
                            isTouched={password.isTouched}
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
                        <span className="login__mode" onClick={toggleAuthMode}>
                            {isSignUpMode
                                ? 'Sign in instead'
                                : 'Sign up instead'}
                        </span>
                    </p>

                    <div className="login__provider-button">
                        <Button
                            type="button"
                            onClick={handleGoogleSignIn}
                            width="100%"
                            disabled={isLoading}
                        >
                            <div className="login__provider-button-icon">
                                <span className="login__provider-button-text">
                                    Continue with google
                                </span>
                                <FcGoogle size={18} />
                            </div>
                        </Button>
                    </div>
                    <div className="login__provider-button login__provider-button--facebook">
                        <Button
                            type="button"
                            onClick={handleFacebookSignIn}
                            width="100%"
                            disabled={isLoading}
                        >
                            <div className="login__provider-button-icon">
                                <span className="login__provider-button-text">
                                    Continue with facebook
                                </span>
                                <BsFacebook size={18} className="facebook" />
                            </div>
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
