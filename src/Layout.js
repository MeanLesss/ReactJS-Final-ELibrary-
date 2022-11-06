import React, { useCallback, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import './Layout.css'

export default function Layout() {
  const navigate = useNavigate();
  const DoLogout = useCallback((e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/', { replace: true });
  })
  const user = JSON.parse(localStorage.getItem('user'))
  const [name, setName] = React.useState(user.user.username);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  //Display profile popUp
  const ProfileDialog = () => {

    return (
      <div>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          fullWidth
          maxWidth = 'xl'
          scroll={'paper'}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Profile
            <DialogActions>
              <CloseIcon onClick={handleCloseDialog}>Close</CloseIcon>
            </DialogActions>
          </DialogTitle>
          {/* for the profile pic */}
          <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              id="avatar"
              sx={{
                margin:1,
                width: 120,
                height: 120,
                fontSize: 70,
                backgroundColor: '#777',
                border: '3px solid lime'
              }}>
              {name[0]}
            </Avatar>
          </DialogContent>
          {/* For inputs we need to use grid */}
          <DialogContent>
            <DialogContentText>
              Username
            </DialogContentText>
            <TextField
              disabled
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>

        </Dialog>
      </div>
    );
  }

  // return the main page
  return (
    <>
      <div>
        {/* this part should have nav bar */}
        <div id="navBar">
          <h1>MyStat Library 📖</h1>
          <div id="userInfo">
            <label>{name}</label>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}>
                <Avatar
                  id="avatar"
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#777',
                    border: '3px solid lime'
                  }}>
                  {name[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {/* this Menu part invoke when click on the avatar (profile pics)*/}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              mt: 1.5,
              width: 200,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          <MenuItem onClick={handleClickOpen}>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>

          <MenuItem onClick={DoLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        {/* <button onClick={DoLogout}>Log out</button> */}

      </div>
      <ProfileDialog />
      <Outlet />
    </>
  )
}
