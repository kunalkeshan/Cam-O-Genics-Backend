/**
 * Verify OTP Admins
 */

// Dependencies
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import server from '../../utils/axios';
import { MuiOtpInput } from 'mui-one-time-password-input'

import { Grid, CssBaseline, Box, Paper, Avatar, Typography, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyIcon from '@mui/icons-material/Key';
import { formatDistance } from 'date-fns';

import { showSnackbar, showLoading } from '../../store/features/app';
import Copyright from '../../components/layouts/Copyright';

const theme = createTheme();

const VerifyOtp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [otp, setOtp] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    const handleVerifyOtp = (location) => async (e) => { };

    const handleResendOtp = async () => { };

    const validateChar = (text) => {
        if (isNaN(text)) {
            return false;
        }
        return true;
    }

    const otpExpireTime = useMemo(() => {
        return formatDistance(new Date(state.expiresIn), currentTime, { includeSeconds: true, addSuffix: true })
    }, [currentTime, state]);

    console.log(otpExpireTime)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

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
                        backgroundImage: 'url(https://images.unsplash.com/photo-1634573615282-84b2338aeea3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80)',
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
                            Verify OTP
                        </Typography>
                        <Typography component="h6" variant="body1">
                            Enter the OTP that was sent to your registered account email.
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleVerifyOtp('form')}>
                            <MuiOtpInput
                                length={4}
                                value={otp}
                                onChange={setOtp}
                                validateChar={validateChar}
                                onComplete={handleVerifyOtp('input')}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Verify OTP
                            </Button>
                            <Grid container mt={3}>
                                <Grid item>
                                    <Typography variant='caption'>OTP expires/d {otpExpireTime}</Typography>
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

export default VerifyOtp