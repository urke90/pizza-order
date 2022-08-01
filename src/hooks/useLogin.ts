import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

interface IUseLogin {
    handleGoogleSignIn: () => Promise<void>;
    handleUserLogout: () => Promise<void>;
    handleSignInWithCredentials: (
        e: React.FormEvent<HTMLFormElement>,
        email: string,
        password: string
    ) => Promise<void>;
    handleSignUpWithCredentials: (
        e: React.FormEvent<HTMLFormElement>,
        email: string,
        password: string
    ) => Promise<void>;
}

export const useLogin = (): IUseLogin => {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const handleUserLogout = async (): Promise<void> => {
        try {
            await signOut(auth);
            navigate('/login', { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignInWithCredentials = async (
        e: React.FormEvent<HTMLFormElement>,
        email: string,
        password: string
    ): Promise<void> => {
        e.preventDefault();

        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log('SIGN IN WITH EMAIL AND PW', response);

            navigate('/', { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignUpWithCredentials = async (
        e: React.FormEvent<HTMLFormElement>,
        email: string,
        password: string
    ): Promise<void> => {
        e.preventDefault();

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            navigate('/', { replace: true });
            console.log('CREATE USER WITH EMAIL AND PW', response);
        } catch (error) {
            console.log('error with creacte', error);
        }
    };

    return {
        handleGoogleSignIn,
        handleUserLogout,
        handleSignInWithCredentials,
        handleSignUpWithCredentials
    };
};
