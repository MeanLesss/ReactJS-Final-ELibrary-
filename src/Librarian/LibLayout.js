import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

export default function LibLayout() {
    const pages = ['Dashboard', 'Groups', 'Books', 'Users'];

    const ResponsiveAppBar = () => {
        const navigate = useNavigate();
        const [anchorElNav, setAnchorElNav] = React.useState(null);
        const [anchorElUser, setAnchorElUser] = React.useState(null);
    
        const handleOpenNavMenu = (event) => {
            setAnchorElNav(event.currentTarget);
        };
    
        const handleCloseNavMenu = () => {
            setAnchorElNav(null);
        };
    // '/librarian/' + 
        const GotoPage = (e, link) => {
            navigate('/librarian/'+link, { replace: true });
            // console.log(link);
        }
    
        return (
            <>
                <AppBar position="static" sx={
                    {
                        backgroundColor: 'lightgreen'
                    }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
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
                                            <Button 
                                                textalign="center"
                                                id="navButton"
                                                onClick={event => GotoPage(event, page)}>
                                                {page}
                                            </Button>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
    
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        id="navButton"
                                        onClick={event => GotoPage(event, page)}
                                        sx={{ my: 2, color: 'white', display: 'block' }}>
                                        {page}
                                    </Button>
                                ))}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Outlet />
            </>
        );
    }
  return (
        <ResponsiveAppBar/>
  )
}
