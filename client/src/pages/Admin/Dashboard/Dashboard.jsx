/**
 * Dashboard Page
 */

// Dependencies
import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

import { Box, CssBaseline, Toolbar, IconButton, Typography, Badge, Divider, List, Container, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DeckIcon from '@mui/icons-material/Deck';
import EventIcon from '@mui/icons-material/Event';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

import Copyright from '../../../components/layouts/Copyright';
import Menu from '../../../components/dashboard/Menu';

const drawerWidth = 240;

const mainNavList = [
    {
        name: 'Dashboard',
        Icon: DashboardIcon,
        nav: '/admin/dashboard/'
    },
    {
        name: 'Community',
        Icon: PeopleIcon,
        nav: '/admin/dashboard/community'
    },
    {
        name: 'Club',
        Icon: DeckIcon,
        nav: '/admin/dashboard/club'
    },
    {
        name: 'Events',
        Icon: EventIcon,
        nav: '/admin/dashboard/events'
    },
    {
        name: 'Notifications',
        Icon: NotificationsIcon,
        nav: '/admin/dashboard/notifications',
    },
    {
        name: 'Audits',
        Icon: FormatListBulletedIcon,
        nav: '/admin/dashboard/audits',
    },
];

const moreNavList = [
    {
        name: 'Profile',
        Icon: AccountCircleIcon,
        nav: '/admin/dashboard/me',
    },
    {
        name: 'Settings',
        Icon: SettingsIcon,
        nav: '/admin/dashboard/settings',
    },
];

const NavItem = ({ name, Icon, nav }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(nav);
    }

    return (
        <ListItemButton onClick={handleNavigate} title={name}>
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={name} />
        </ListItemButton>
    )
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

const Dashboard = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [notificationCount, setNotificationCount] = useState(0);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit" onClick={() => navigate('/admin/dashboard/notifications')}>
                            <Badge badgeContent={notificationCount} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Menu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainNavList.map((item, index) => (
                            <NavItem key={index} {...item} />
                        ))}
                        <Divider sx={{ my: 1 }} />
                        {moreNavList.map((item, index) => (
                            <NavItem key={index} {...item} />
                        ))}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Outlet />
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Dashboard