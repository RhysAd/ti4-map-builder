import { Box, Button, Card, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon } from "../../customIcons/CustomIcons";
import "./AuthDisplay.scss";

export function SignUp({logInPressed}: {logInPressed: () => void}) {

    const [dispayNameError, setDispayNameError] = useState(false)
    const [dispayName, setDispayName] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (emailError || passwordError) {
          return;
        }
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
    };

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
    
        let isValid = true;
    
        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
          setEmailError(true);
          setEmailErrorMessage('Please enter a valid email address.');
          isValid = false;
        } else {
          setEmailError(false);
          setEmailErrorMessage('');
        }
    
        if (!password.value || password.value.length < 6) {
          setPasswordError(true);
          setPasswordErrorMessage('Password must be at least 6 characters long.');
          isValid = false;
        } else {
          setPasswordError(false);
          setPasswordErrorMessage('');
        }
    
        return isValid;
    };

    return (
        <Stack className="auth-display-container">
            <Card className="auth-display-card">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{fontWeight: "medium"}}

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
                    <FormLabel
                        htmlFor="display-name"
                        sx={{marginBottom: "8px"}}
                    >
                        Display Name
                    </FormLabel>
                    <TextField
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="display-name"
                        type="text"
                        name="display-name"
                        placeholder="Name"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                        size="small"
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel
                        htmlFor="email"
                        sx={{marginBottom: "8px"}}
                    >
                        Email
                    </FormLabel>
                    <TextField
                        error={emailError}
                        helperText={emailErrorMessage}
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
                        size="small"
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel
                        htmlFor="password"
                        sx={{marginBottom: "8px"}}
                    >
                        Password
                    </FormLabel>
                    <TextField
                        error={passwordError}
                        helperText={passwordErrorMessage}
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
                        size="small"
                    />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <ForgotPassword open={open} handleClose={handleClose} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={validateInputs}
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
        </Stack>
    )
}