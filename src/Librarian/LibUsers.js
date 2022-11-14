import React, { useEffect, useState, useCallback } from 'react'
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AddUpdateUser, GetUsers } from '../AuthServices'
import { createRef } from 'react';

export default function LibUsers() {
    const user = JSON.parse(localStorage.getItem('user'));
    const group_count = JSON.parse(localStorage.getItem('groupCount'))
    const [users, setUsers] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const [groupId, setGroupId] = useState();
    const [groupIdAdd, setGroupIdAdd] = useState('1');
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('Student');
    const [roleAdd, setRoleAdd] = useState('Student');
    const roles = ['Student', 'Teacher', 'Librarian']
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickOpen = () => {
        setOpenAddDialog(true);
    };
    const handleClickOpenUpdate = () => {
        setOpenUpdateDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenAddDialog(false);
    };
    const handleCloseDialogUpdate = () => {
        setOpenUpdateDialog(false);
    };
    useEffect(() => {
        const controller = new AbortController();
        GetUsers({
            token: user.token, search: search, group_id: groupId,
            role: role, sort_order: 'asc', control: controller.signal
        })
            .then(data => { setUsers(data) })
        return () => {
            controller.abort();
        }
    }, [user.token, groupId, search, role])
    // console.log(users);
    // console.log(group_count);

    //Component
    const DisplayContent = useCallback((event) => {
        if (users != null && users.users.length > 0) {
            return (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Title</TableCell>
                                    <TableCell align="center">Password</TableCell>
                                    <TableCell align="center">Group ID</TableCell>
                                    <TableCell align="center">Forward addr</TableCell>
                                    <TableCell align="center">Remote addr</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody experimentalfeature={{ lazyLoading: true }}>
                                {[...users.users].map((user) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {user.id}
                                        </TableCell>
                                        <TableCell align="center">{user.username}</TableCell>
                                        <TableCell align="center">{user.pwd}</TableCell>
                                        <TableCell align="center">{user.group_id}</TableCell>
                                        <TableCell align="center">{user.forward_addr}</TableCell>
                                        <TableCell align="center">{user.remote_addr}</TableCell>
                                        <TableCell align="center">{user.role}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={(event) => {
                                                handleClickOpenUpdate(); setSelectedUser(user);
                                            }}><EditIcon /></Button> /
                                            {/* <Button onClick={(event)=>{AddUpdateUserDialog(user)}}><EditIcon /></Button> / */}
                                            <Button><DeleteIcon /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <AddUpdateUserDialog/> */}

                </>
            )
        } else {
            return (
                <Container>
                    <h1>No user found in this group</h1>
                </Container>
            )
        }
    })
    //this drop down is for the sort user part
    const RoleDropDown = () => {
        const handleChange = (event) => {
            event.preventDefault();
            setRole(event.target.value);
        };
        // defaultValue={'Student'}
        return (
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Roles</InputLabel>
                <Select onChange={handleChange} value={role} id="select" label="Role">
                    {roles.map((g, i) => {

                        return (
                            <MenuItem key={i} value={g}>
                                {g}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }
    //this drop down is for the add user part
    const RoleAddDropDown = () => {
        const handleChange = (event) => {
            setRoleAdd(event.target.value);
        };
        // defaultValue={'Student'}
        return (
            // <FormControl sx={{ m: 1, minWidth: 200 }}>
            <>
                <InputLabel id="demo-simple-select-autowidth-label">Roles</InputLabel>
                <Select onChange={(event) => { handleChange(event) }} value={roleAdd} id="grouped-select" label="Role" >
                    {roles.map((g, i) => {
                        return (
                            <MenuItem key={i} value={g}>
                                {g}
                            </MenuItem>
                        )
                    })}
                </Select>
            </>
        )
    }
    //filter group dropdown
    const GroupDropDown = () => {
        const handleChange = (event) => {
            event.preventDefault();
            setGroupId(event.target.value);
            // console.log(groupId);
        };
        return (
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Group ID</InputLabel>
                <Select onChange={handleChange} value={groupId} id="select" label="Group ID">
                    <MenuItem key={0} value={null}>
                        None
                    </MenuItem>
                    {[...Array(group_count)].map((_, i) => {
                        return (
                            <MenuItem key={i} value={i + 1}>
                                {i + 1}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }
    //In add user form drop down
    const GroupAddDropDown = (info) => {
        const handleChange = (event) => {
            event.preventDefault();
            setGroupIdAdd(event.target.value);
            // console.log(groupId);
        };
        return (
            // <FormControl sx={{ m: 1, minWidth: 200 }}>
            <>
                <InputLabel id="demo-simple-select-autowidth-label">Group ID</InputLabel>
                <Select onChange={(e) => { handleChange(e) }} value={groupIdAdd} id="grouped-select" label="Group ID">
                    {[...Array(group_count)].map((_, i) => {
                        return (
                            <MenuItem key={i} value={i + 1}>
                                {i + 1}
                            </MenuItem>
                        )
                    })}
                </Select>
                {/* </FormControl> */}
            </>
        )
    }

    const [err, setError] = useState(false);
    const [errText, setErrorText] = useState('');

    const AddUserDialog = useCallback(() => {
        const username = createRef('');
        const pwd = createRef('');
        const old_pwd = createRef('');
        const confirm_pwd = createRef('');
        // const fAddr = createRef('');
        // const rAddr = createRef('');
        const handleSubmit = async (e) => {
            e.preventDefault();
            // console.log({
            //     user_token: user.token,
            //     id: info.id,
            //     username: username.current.value,
            //     pwd: pwd.current.value,
            //     confirm_pwd: confirm_pwd.current.value,
            //     group_id: groupIdAdd,
            //     role: roleAdd
            // })
            if (username.current.value.length == 0) {
                setErrorText('error usernmae')
                setError(true);
                return;
            }
            if (pwd.current.value.length == 0) {
                setErrorText('error password')
                setError(true);
                return;
            }
            var res = await AddUpdateUser({
                user_token: user.token,
                // id: info.id,
                username: username.current.value,
                // old_pwd: old_pwd.current.value,
                pwd: pwd.current.value,
                confirm_pwd: confirm_pwd.current.value,
                group_id: groupIdAdd,
                role: roleAdd
            });
            if (res.status != "SUCCESS") {
                setErrorText(res.error)
                setError(true);
                return;
            }
            setOpenAddDialog(false);
            // console.log(res);
        };

        return (
            <form >
                <Dialog
                    open={openAddDialog}
                    onClose={handleClose}
                    fullWidth
                    maxWidth='sm'
                    scroll={'paper'}>
                    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        Add User
                        <DialogActions>
                            <CloseIcon onClick={handleCloseDialog}>Close</CloseIcon>
                        </DialogActions>
                    </DialogTitle>
                    {/* for the profile pic */}
                    <DialogContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <RoleAddDropDown />
                        <GroupAddDropDown />

                        {err && <Alert id="alert" severity="error">
                            <AlertTitle>{errText}</AlertTitle>
                        </Alert>}

                        <TextField
                            // disabled
                            inputRef={username}
                            // defaultValue={info.username}
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="outlined" />
                        <TextField
                            // disabled
                            inputRef={pwd}
                            defaultValue={''}
                            margin="dense"
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="outlined" />
                        <TextField
                            // disabled
                            inputRef={confirm_pwd}
                            defaultValue={''}
                            margin="dense"
                            label="Confirm password"
                            type="password"
                            fullWidth
                            variant="outlined" />

                    </DialogContent>
                    <Button type="submit" onClick={(e) => {handleSubmit(e)}}>Save</Button>
                </Dialog>
            </form>
        );
    })
    const UpdateUserDialog = useCallback(() => {
        const username = createRef('');
        const pwd = createRef('');
        const old_pwd = createRef('');
        const confirm_pwd = createRef('');
        const handleSubmit = async (e) => {
            e.preventDefault();
            // console.log({
            //     user_token: user.token,
            //     id: info.id,
            //     username: username.current.value,
            //     pwd: pwd.current.value,
            //     confirm_pwd: confirm_pwd.current.value,
            //     group_id: groupIdAdd,
            //     role: roleAdd
            // })
            if (username.current.value.length == 0) {
                setErrorText('error usernmae')
                setError(true);
                return;
            }
            if (pwd.current.value.length == 0) {
                setErrorText('error password')
                setError(true);
                return;
            }
            var res = await AddUpdateUser({
                user_token: user.token,
                // id: info.id,
                username: username.current.value,
                // old_pwd: old_pwd.current.value,
                pwd: pwd.current.value,
                confirm_pwd: confirm_pwd.current.value,
                group_id: groupIdAdd,
                role: roleAdd
            });
            if (res.status != "SUCCESS") {
                setErrorText(res.error)
                setError(true);
                return;
            }
            setOpenAddDialog(false);
            // console.log(res);
        };

        return (
            <form>
                <Dialog
                    open={openAddDialog}
                    onClose={handleClose}
                    fullWidth
                    maxWidth='sm'
                    scroll={'paper'}>
                    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        Add User
                        <DialogActions>
                            <CloseIcon onClick={handleCloseDialogUpdate}>Close</CloseIcon>
                        </DialogActions>
                    </DialogTitle>
                    {/* for the profile pic */}
                    <DialogContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <RoleAddDropDown />
                        <GroupAddDropDown />

                        {err && <Alert id="alert" severity="error">
                            <AlertTitle>{errText}</AlertTitle>
                        </Alert>}

                        {/* <TextField
                            // disabled
                            inputRef={username}
                            // defaultValue={info.username}
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="outlined" /> */}
                        <TextField
                            // disabled
                            inputRef={pwd}
                            defaultValue={''}
                            margin="dense"
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="outlined" />
                        <TextField
                            // disabled
                            inputRef={confirm_pwd}
                            defaultValue={''}
                            margin="dense"
                            label="Confirm password"
                            type="password"
                            fullWidth
                            variant="outlined" />

                    </DialogContent>
                    <Button type="submit" onClick={(e) => { e.preventDefault(); handleSubmit(e) }}>Save</Button>
                </Dialog>
            </form>
        );
    })
    //render the actual display
    return (
        <>
            <Container>
                <h1>Manage Users</h1>
                <RoleDropDown {...{ add: false }} />
                <GroupDropDown />
                <TextField id="outlined-basic" label="Search user" variant="outlined"
                    sx={{ marginTop: 1 }}
                    onChange={(e) => { setSearch(e.target.value) }} />
                <Button color="success" variant="outlined" onClick={(event) => {
                    handleClickOpen();
                    setSelectedUser(null);
                }}
                    sx={{ height: 55, marginTop: 1, marginLeft: 1 }}>Add User <PersonAddAltIcon /></Button>
                <DisplayContent />
            </Container>
            <UpdateUserDialog {...selectedUser} />
            <AddUserDialog {...selectedUser} />
        </>
    )
}
