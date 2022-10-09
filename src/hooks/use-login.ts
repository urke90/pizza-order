import { useCallback, useState } from 'react';
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth';

import { auth } from '../firebase/firebase';
import { db } from '../firebase/firebase';
import { ref, set, child, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

interface IUseLogin {
    handleGoogleSignIn: () => Promise<void>;
    handleFacebookSignIn: () => Promise<void>;
    handleUserLogout: () => Promise<void>;
    handleSignInWithCredentials: (
        e: React.FormEvent<HTMLFormElement>,
        email: string,
        password: string
    ) => Promise<void>;
    handleSignUpWithCredentials: (
        e: React.FormEvent<HTMLFormElement>,
        email: string,
        password: string,
        userName: string
    ) => Promise<void>;
    isLoading: boolean;
}

interface ICreatedUser {
    userName: string;
    email: string;
    imageUrl?: string;
    uid: string;
}

export const useLogin = (): IUseLogin => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const createNewUserInDb = useCallback(async (userData: ICreatedUser) => {
        const dbRef = ref(db);

        const { uid, userName, email, imageUrl } = userData;

        try {
            const existingUser = await get(child(dbRef, `users/${uid}`));

            if (!existingUser.exists()) {
                const createdUser: ICreatedUser = {
                    userName,
                    email,
                    imageUrl,
                    uid
                };
                await set(ref(db, 'users/' + uid), createdUser);
            }
        } catch (error) {
            console.log("error createing user if it doesn't exist", error);
        }
    }, []);

    const handleFacebookSignIn = async (): Promise<void> => {
        const provider = new FacebookAuthProvider();

        try {
            setIsLoading(true);
            const response = await signInWithPopup(auth, provider);
            console.log('response', response);

            const { displayName, uid, email, photoURL } = response.user;

            const credential =
                FacebookAuthProvider.credentialFromResult(response);

            console.log('credential FB ', credential);

            await createNewUserInDb({
                uid,
                userName: displayName ? displayName : '',
                email: email ? email : '',
                imageUrl: photoURL ? photoURL : ''
            });

            navigate('/', { replace: true });
            setIsLoading(false);
        } catch (error) {
            console.log(
                'ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
                error
            );
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async (): Promise<void> => {
        const provider = new GoogleAuthProvider();

        try {
            setIsLoading(true);
            const response = await signInWithPopup(auth, provider);
            const { displayName, uid, email, photoURL } = response.user;

            const credential =
                GoogleAuthProvider.credentialFromResult(response);

            console.log('credential FROM GOOGLE', credential);

            await createNewUserInDb({
                uid,
                userName: displayName ? displayName : '',
                email: email ? email : '',
                imageUrl: photoURL ? photoURL : ''
            });

            navigate('/', { replace: true });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleUserLogout = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await signOut(auth);
            navigate('/login', { replace: true });
            setIsLoading(false);
        } catch (error) {
            console.log('error sign out', error);
            setIsLoading(false);
        }
    };

    const handleSignInWithCredentials = async (
        e: React.FormEvent<HTMLFormElement>,
        email: string,
        password: string
    ): Promise<void> => {
        e.preventDefault();

        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/', { replace: true });
            setIsLoading(false);
        } catch (error) {
            console.log('error with sign in with credentials', error);
            setIsLoading(false);
        }
    };

    const handleSignUpWithCredentials = async (
        e: React.FormEvent<HTMLFormElement>,
        email: string,
        password: string,
        userName: string = ''
    ): Promise<void> => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const { uid } = response.user;

            await createNewUserInDb({
                uid,
                userName,
                email,
                imageUrl: ''
            });

            navigate('/', { replace: true });
            setIsLoading(false);
        } catch (error) {
            console.log('handleSignUpWithCredentials', error);
            setIsLoading(false);
        }
    };

    return {
        handleGoogleSignIn,
        handleFacebookSignIn,
        handleUserLogout,
        handleSignInWithCredentials,
        handleSignUpWithCredentials,
        isLoading
    };
};
