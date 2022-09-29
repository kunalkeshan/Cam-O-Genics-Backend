/**
 * Admin Page
 */

import React from 'react'
import { Outlet } from 'react-router-dom'

import { Box, styled } from '@mui/material'

const Admin = () => {
    return (
        <Main>
            <Outlet />
        </Main>
    )
};

const Main = styled(Box)({
    width: '100%',
    height: '100vh',
})

export default Admin