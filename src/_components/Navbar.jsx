import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../_store';
import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { history } from '../_helpers';
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
export { Navbar };
const pages = ['Products', 'Pricing', 'Blog'];

function Navbar() {
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const logout = () => dispatch(authActions.logout());

    const navigate = useNavigate();
    const handleNavigation = (location) => {
        navigate(location);
    };
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //if (!authUser) return null;

    return (
        <AppBar position="static" sx={{ bgcolor: "gray" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DRINKING GAME
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DRINKING GAME
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {
                        (authUser != null && authUser.roleId == 1) ?
                        (
                            <Box sx={{ flexGrow: 0 , mx: 1}} >
                                <Tooltip title="Admin settings">
                                    <IconButton sx={{ p: 0 }}>
                                        <AdminPanelSettingsIcon
                                            style={{ color: 'white' }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        ) :
                        null
                    }
                    <Box sx={{ flexGrow: 0 , ml:1 }}>
                        <Tooltip title="Account settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircle
                                    style={{ color: 'white' }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {
                                authUser != null ?
                                    (
                                        [
                                            <MenuItem key="profile" onClick={handleCloseUserMenu}>
                                                <Link to="/profile" ><Typography textAlign="center">Profile</Typography></Link>
                                            </MenuItem>,
                                            <MenuItem key="logout" onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center" onClick={logout}>Logout</Typography>
                                            </MenuItem>
                                        ]) :
                                    (
                                        [
                                            <MenuItem key="login" onClick={handleCloseUserMenu}>
                                                <Link to="/login"><Typography textAlign="center">Sign In</Typography></Link>
                                            </MenuItem>,
                                            <MenuItem key="register" onClick={handleCloseUserMenu}>
                                                <Link to="/register"><Typography textAlign="center">Sign Up</Typography></Link>
                                            </MenuItem>
                                        ])
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
