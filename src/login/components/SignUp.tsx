import { Alert, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { GoogleIcon } from "../../customIcons/CustomIcons";
import { auth } from '../../Firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Card, SignInContainer } from "./Styled"

export function SignUp({logInPressed}: {logInPressed: () => void}) {

    const [displayNameError, setDispayNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [signUpError, setSignUpError] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email: string | undefined = data.get("email")?.toString()
        const password: string | undefined = data.get("password")?.toString()
        const displayName: string | undefined = data.get("display-name")?.toString()
        if (!validateInputs(email, password, displayName)) {
            return
        }
        createUserWithEmailAndPassword(auth, email!, password!)
            .then((userCredential) => {
                return updateProfile(userCredential.user, {displayName: displayName})
            })
            .catch((error) => {
                const errorCode = error.code
                if (errorCode === "auth/email-already-in-use") {
                    setSignUpError("Email already in use")
                }
                else {
                    setSignUpError("An error occured")
                }
            })
    };

    const validateInputs = (email: string | undefined, password: string | undefined, displayName: string | undefined) => {
        let isValid = true;
    
        if (email === undefined || !/\S+@\S+\.\S+/.test(email)) {
          setEmailError('Please enter a valid email address.');
          isValid = false;
        } else {
          setEmailError('');
        }
    
        if (password === undefined || password.length < 6) {
          setPasswordError('Password must be at least 6 characters long.');
          isValid = false;
        } else {
          setPasswordError('');
        }

        if (displayName === undefined || displayName.length < 3) {
            setDispayNameError('Display name must be at least 3 characters long.');
            isValid = false;
        } else {
            setDispayNameError('');
        }
    
        return isValid;
    };

    return (
        <SignInContainer>
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}

                >
                    Sign up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                    <FormLabel htmlFor="display-name">Display Name</FormLabel>
                    <TextField
                        error={displayNameError !== ""}
                        helperText={displayNameError}
                        id="display-name"
                        type="text"
                        name="display-name"
                        placeholder="Name"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        error={emailError !== ""}
                        helperText={emailError}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        error={passwordError !== ""}
                        helperText={passwordError}
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                    />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    {signUpError !== "" ?
                    <Alert severity="error">
                        {signUpError}
                    </Alert> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Sign up
                    </Button>
                </Box>
                <Divider>or</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => alert('Sign in with Google')}
                        startIcon={<GoogleIcon />}
                    >
                        Sign up with Google
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                    <Link
                        component="button"
                        type="button"
                        variant="body2"
                        onClick={logInPressed}
                    >
                        Log in
                    </Link>
                    </Typography>
                </Box>
            </Card>
        </SignInContainer>
    )
}