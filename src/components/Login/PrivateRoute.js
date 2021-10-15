import { Box, LinearProgress } from '@material-ui/core';
import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (children)
                    : <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    >

                    </Redirect>
            }
        >

        </Route>
    );
};

export default PrivateRoute;