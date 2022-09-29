/**
 * Snackbar Component
 */

// Dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Mui
import Main from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

// Actions
import { hideSnackbar } from '../../store/features/app';

function Snackbar() {
    const dispatch = useDispatch();
    const { snackbar } = useSelector((state) => state.app);

    // Close Snackbar Function
    const handleSnackbarClose = () => {
        dispatch(hideSnackbar());
    };

    return (
        <Main
            open={snackbar.open}
            autoHideDuration={6000} // 6 Seconds before Hiding the Snackbar
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            TransitionComponent={Slide}
        >
            <Alert
                onClose={handleSnackbarClose}
                severity={snackbar.severity}
                variant='standard'
                sx={{ zIndex: 500, width: '100%' }}
            >
                {snackbar.message}
            </Alert>
        </Main>
    );
}

export default Snackbar;