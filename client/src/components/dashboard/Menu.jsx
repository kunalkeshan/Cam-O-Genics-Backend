/**
 * Dashboard Menu
 */

// Dependencies
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
// import server from '../../utils/axios';

import { Menu as Main, MenuItem, Avatar, Box, Typography, ListItemIcon, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { logoutUser } from '../../store/features/user'
import { showSnackbar, showLoading } from '../../store/features/app';

const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleLogout = async () => {
        try {
            dispatch(showLoading(true))

        } catch (error) {

        } finally {
            dispatch(showLoading(false));
            dispatch(logoutUser());
            dispatch(showSnackbar({ message: 'Logged out successfully', severity: 'success' }));
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = ({ name, nav }) => () => {
        if (name === 'Logout') {
            handleLogout();
        };
        handleClose();
        navigate(nav);
    }

    const menuItems = [
        {
            name: 'My Account',
            Icon: AccountCircleIcon,
            nav: '/admin/dashboard/me'
        },
        {
            name: 'Logout',
            Icon: LogoutIcon,
        },
    ]

    return (
        <Box>
            <Box
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    cursor: 'pointer',
                }}
            >
                <Avatar src={user?.avatar ?? user?.defaultAvatar} sx={{ width: '28px', height: '28px' }} />
                <Typography variant='body1' component='span' noWrap>{user?.fullName.split(' ')[0]}'s Account</Typography>
                <ExpandMoreIcon />
            </Box>
            <Main
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={handleItemClick(item)}>
                        <ListItemIcon><item.Icon /></ListItemIcon>
                        <ListItemText>{item.name}</ListItemText>
                    </MenuItem>
                ))}
            </Main>
        </Box>
    )
}

export default Menu