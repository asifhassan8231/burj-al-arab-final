import { Box, LinearProgress } from '@material-ui/core';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';


const Login = () => {
    const { user, googleSignIn, isLoading } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/home';
    // console.log('came from', location.state?.from);
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                history.push(redirect_uri);
            })
    }
    if (isLoading) {
        return <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    }
    return (
        <div>
            {user ? <h2>Hello {user?.displayName}</h2> : <div>
                <h1>This is Login</h1>
                <button onClick={handleGoogleSignIn}>Google Sign in</button>
            </div>}
        </div>
    );
};

export default Login;