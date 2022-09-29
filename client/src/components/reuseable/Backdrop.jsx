/**
 * Backdrop Component
 */

// Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import Main from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function Backdrop() {
    const { isLoading } = useSelector((state) => state.app);
    return (
        <Main open={isLoading} sx={{ zIndex: 500, color: 'white' }}>
            <CircularProgress />
        </Main>
    );
}

export default Backdrop;