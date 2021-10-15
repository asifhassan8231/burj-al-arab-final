import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();

    const googleSignIn = () => {
        setIsLoading(true);
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider)
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false))
    }

    const googleSignOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => setUser(null))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
            setIsLoading(false);
        })
    }, [])

    return {
        user,
        error,
        googleSignIn,
        googleSignOut,
        isLoading
    }
}
export default useFirebase;