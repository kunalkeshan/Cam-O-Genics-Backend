/**
 * Forgot Page Admins
 */

// Dependencies
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import server from '../../utils/axios';

import { Grid, CssBaseline, Box, Paper, Avatar, Typography, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyIcon from '@mui/icons-material/Key';

import { showSnackbar, showLoading } from '../../store/features/app';
import Copyright from '../../components/layouts/Copyright';

const theme = createTheme();

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading(true));
            const response = await server({ url: '/api/auth/forgot-password', method: 'post', data: { user } });
            console.log(response)
            dispatch(showSnackbar({ message: 'An OTP has been sent to your account.', severity: 'success' }));
            navigate('/admin/verify-otp', { state: { ...response.data, user } })
        } catch (err) {
            console.log(err);
            const { data } = err.data;
            if (err.data.message === "app/request-validation-error") {
                if (data.type === 'alternatives.match') {
                    setError('Invalid Email or ID.')
                }
            } else if (err.data.message === "auth/account-does-not-exist") {
                setError('Account does not exist');
            }
        } finally {
            dispatch(showLoading(false));
        }
    }

    const handleTextChange = (e) => {
        setUser(e.target.value);
        setError('')
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1577866906975-62bfc5ebf5c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <KeyIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Forgot Password
                        </Typography>
                        <Typography component="h6" variant="body1">
                            An OTP will be sent to your registered email to confirm if it's really you.
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleForgotPassword}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email, COG ID or phone"
                                autoComplete="off"
                                autoFocus
                                value={user}
                                onChange={handleTextChange}
                                error={error.length > 0}
                                helperText={error.length > 0 ? error : null}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send OTP
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to='/admin/auth'>
                                        {"Remember your password? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default ForgotPassword