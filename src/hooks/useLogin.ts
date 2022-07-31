import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
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

    const handleUserLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login', { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        handleGoogleSignIn,
        handleUserLogout
    };
};
