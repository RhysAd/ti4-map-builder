import { useContext } from 'react';
import { AuthDisplay } from '../login/AuthDisplay';
import { AuthContext } from '../login/AuthProvider';
import { CircularProgress}  from '@mui/material';
import { MenuBar } from './components/MenuBar';
import { Routes } from './components/Routes';

export function Pages() {
    const auth = useContext(AuthContext)

    function signOut () {
        auth.signOut()
    }

    if (auth.loading) {
        return <CircularProgress />
    }

    if (!auth.user) {
        return <AuthDisplay />
    }

    return (
        <>
        <MenuBar signOut={signOut} />
        <Routes />
        </>
    )
}