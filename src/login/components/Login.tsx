import { Alert, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon } from "../../customIcons/CustomIcons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Firebase';
import { Card, SignInContainer } from "./Styled"

export function Login({signUpPressed}: {signUpPressed: () => void}) {

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [loginError, setLoginError] = useState("")
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email: string | undefined = data.get("email")?.toString()
        const password: string | undefined = data.get("password")?.toString()
        if (!validateInputs(email, password)) {
            return
        }
        signInWithEmailAndPassword(auth, email!, password!)
            .then((userCredential) => {

            })
            .catch((error) => {
                const errorCode = error.code
                if (errorCode === "auth/user-not-found") {
                    setLoginError("Email not in use")
                }
                else if (errorCode === "auth/wrong-password") {
                    setLoginError("Incorrect email or password")
                }
                else {
                    setLoginError("An error occured")
                }
            })
    };

    const validateInputs = (email: string | undefined, password: string | undefined) => {
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
                    Log in
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
                    {loginError !== "" ?
                    <Alert severity="error">
                        {loginError}
                    </Alert> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Log in
                    </Button>
                    <ForgotPassword open={open} handleClose={handleClose} />
                    <Link
                        component="button"
                        type="button"
                        onClick={handleClickOpen}
                        variant="body2"
                        sx={{ alignSelf: 'center' }}
                    >
                        Forgot your password?
                    </Link>
                </Box>
                <Divider>or</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => alert('Sign in with Google')}
                        startIcon={<GoogleIcon />}
                    >
                        Sign in with Google
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don&apos;t have an account?{' '}
                    <Link
                        component="button"
                        type="button"
                        variant="body2"
                        onClick={signUpPressed}
                    >
                        Sign up
                    </Link>
                    </Typography>
                </Box>
            </Card>
        </SignInContainer>
    )
}