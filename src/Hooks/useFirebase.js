import { useState, useEffect } from "react";

import { getAuth, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [manager, setManager] = useState(false);
    const [owner, setOwner] = useState(false);
    const auth = getAuth();


    
    // verify owner
    useEffect(() => {
        fetch(`https://safe-caverns-99351.herokuapp.com/users/houseOwner/${user.email}`)
            .then(res => res.json())
            .then(data => setOwner(data.owner))
    }, [user.email]);


    // login user
    const loginUser = (email, password, location, history) => {


        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination)

                setError('');
            })
            .catch((error) => {
                const errorCode = error.code;
                setError(errorCode);
            })
            .finally(() => setIsLoading(false))

    }
    // logout or signout
    const logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    // save user
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://safe-caverns-99351.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }


    // observe user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                setUser(user)
                // ...
            } else {
                setUser({})
            }
            setIsLoading(false)
            return () => unSubscribe;
        });

    }, [])

    return {
        user,
        admin,
        manager,
        owner,
        logOut,
        loginUser,
        isLoading,
        error
    }

}
export default useFirebase;