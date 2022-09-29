/**
 * Login Page Admins
 */

// Dependencies
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import server from '../../utils/axios';

import { Grid, CssBaseline, Box, Paper, Avatar, Typography, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { showSnackbar, showLoading } from '../../store/features/app';
import Copyright from '../../components/layouts/Copyright';
import { loginUser } from '../../store/features/user';

const theme = createTheme();

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState({
        user: '',
        password: '',
    })
    const [error, setError] = useState({
        for: '',
        message: '',
    })

    const handleUserLogin = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading(true));
            const response = await server({ url: '/api/auth/login', method: 'post', data: { ...text } })
            if (!response.data.loginUser.authRoles.includes('ADMIN')) {
                dispatch(showSnackbar({ severity: 'error', message: 'Only Admins can login. You do not have access.' }))
            }
            dispatch(loginUser(response.data.loginUser));
            navigate('/admin/dashboard');
        } catch (err) {
            const { data } = err.data;
            if (err.data.message === "app/request-validation-error") {
                if (data.type === "alternatives.match") {
                    setError((prev) => { return { ...prev, for: data.path[0], message: 'Invalid ID or Email' } });
                } else if (data.type === "string.empty") {
                    setError((prev) => { return { ...prev, for: data.path[0], message: 'Cannot be empty!' } });
                }
            } else if (err.data.message === "auth/account-does-not-exist") {
                dispatch(showSnackbar({ severity: 'error', message: 'Account does not exist!' }))
            } else if (err.data.message === "auth/invalid-password") {
                setError((prev) => { return { ...prev, for: 'password', message: 'Invalid Password!' } })
            }
        } finally {
            dispatch(showLoading(false));
        }
    }

    const handleInput = (field) => (e) => {
        setText((prev) => { return { ...prev, [field]: e.target.value } });
        setError({ for: '', message: '' });
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
                        backgroundImage: 'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80)',
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
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleUserLogin}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="COG ID, Email, or Phone"
                                autoComplete="off"
                                autoFocus
                                onChange={handleInput('user')}
                                error={error.for === 'user'}
                                helperText={error.for === 'user' && error.message}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={handleInput('password')}
                                error={error.for === 'password'}
                                helperText={error.for === 'password' && error.message}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to='/admin/forgot-password'>
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>

    )
}

export default Auth