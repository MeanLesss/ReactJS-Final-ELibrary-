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
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetGroupList } from '../src/AuthServices';

import './Layout.css'

export default function Layout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const groups = JSON.parse(localStorage.getItem('groups'));
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
  const DoLogout = useCallback((e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/', { replace: true });
  })
  useEffect(() => {
    GetGroupList(user.token).then(data => localStorage.setItem('groups', JSON.stringify(data)));
  }, [user.token])
  //Display profile popUp
  const ProfileDialog = () => {
    if (groups) {
      return (
        <div>
          <Dialog
            open={openDialog}
            onClose={handleClose}
            fullWidth
            maxWidth='sm'
            scroll={'paper'}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Profile
              <DialogActions>
                <CloseIcon onClick={handleCloseDialog}>Close</CloseIcon>
              </DialogActions>
            </DialogTitle>
            {/* for the profile pic */}
            <DialogContent sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}>
              <Avatar
                id="avatar"
                sx={{
                  margin: 1,
                  width: 120,
                  height: 120,
                  fontSize: 70,
                  backgroundColor: '#777',
                  border: '3px solid lime'
                }}>
                {name[0]}
              </Avatar>
              <DialogContentText>
                ID: {user.user.id}
              </DialogContentText>
         
              
              <TextField
                // disabled
                defaultValue={user.user.username}
                margin="dense"
                id="username"
                label="Username"
                type="text"
                fullWidth
                variant="outlined" />
              <TextField
                disabled
                value={user.user.role}
                margin="dense"
                id="role"
                label="Role"
                type="text"
                fullWidth
                variant="outlined" />
              <TextField
                disabled
                value={user.token}
                margin="dense"
                id="token"
                label="Token"
                type="text"
                fullWidth
                variant="outlined" />
              {/* table Display groups */}
              <h3>Teaching Groups</h3>
              <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="center">Group Name</TableCell>
                      {/* <TableCell align="center">Action</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...groups].map((group) => (
                      <TableRow
                        key={group.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {group.id}
                        </TableCell>
                        <TableCell align="center">{group.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <Button >Save</Button>
          </Dialog>
        </div>
      );
    } else {
      <div>
        No group found!
      </div>
    }
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
