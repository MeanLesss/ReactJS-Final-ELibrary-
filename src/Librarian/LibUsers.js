import React, { useEffect, useState, useCallback } from 'react'
import Container from '@mui/material/Container';
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
import CachedIcon from '@mui/icons-material/Cached';
import { useRouteLoaderData } from 'react-router-dom';

export default function LibUsers() {
    const user = JSON.parse(localStorage.getItem('user'));
    const group_count = JSON.parse(localStorage.getItem('groupCount'));
    const groups = JSON.parse(localStorage.getItem('groups'));
    let [isChangeGroup, setIsChangeGroup] = useState(false);
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
        setError(false);
    };
    const handleCloseDialogUpdate = () => {
        setOpenUpdateDialog(false);
        setError(false);
        setIsChangeGroup(false);
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
                                    <TableCell align="center">Username</TableCell>
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
                <Select onChange={(e) => { handleChange(e) }} value={role} id="select" label="Role">
                    {roles.map((g, i) => {
                        return (
                            <MenuItem key={i} value={g}>
                                {g}
                            </MenuItem>)
                    })}
                </Select>
            </FormControl>
        )
    }
    //this drop down is for the add user part
    const RoleAddDropDown = (info) => {
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
                {/* </FormControl> */}
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
                    {[...groups.groups].map((group, i) => {
                        return (
                            <MenuItem key={group.id} value={group.id}>
                                {`${group.id}. ${group.name}`}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }
    //In add user form drop down
    const GroupAddDropDown = (info) => {
        if (!isChangeGroup) {
            setGroupIdAdd(info.groupId);
        }
        const handleChange = (event) => {
            setIsChangeGroup(true);
            event.preventDefault();
            setGroupIdAdd(event.target.value);
            // console.log(groupId);
            console.log(groupIdAdd);
        };
        return (
            // <FormControl sx={{ m: 1, minWidth: 200 }}>
            <>
                <InputLabel id="demo-simple-select-autowidth-label">Group ID</InputLabel>
                <Select onChange={(e) => { handleChange(e) }} value={groupIdAdd} id="select" label="Group ID">
                    {[...groups.groups].map((group, i) => {
                        return (
                            <MenuItem key={group.id} value={group.id}>
                                {`${group.id}. ${group.name}`}
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

    const AddUserDialog = useCallback((info) => {
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
            const controller = new AbortController();
            GetUsers({
                token: user.token, search: search, group_id: groupId,
                role: role, sort_order: 'asc', control: controller.signal
            })
                .then(data => { setUsers(data) })
            return () => {
                controller.abort();
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
                    <Button type="submit" onClick={(e) => { handleSubmit(e) }}>Save</Button>
                </Dialog>
            </form>
        );
    }, [openAddDialog, handleCloseDialog, err, errText,])

    //for when click update user
    var [res, setRes] = useState();
    const UpdateUserDialog = useCallback((info) => {
        // setError(false);
        const username = createRef('');
        const pwd = createRef('');
        const new_pwd = createRef('');
        const old_pwd = createRef('');
        const confirm_pwd = createRef('');
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log({
                user_token: user.token,
                id: info.id,
                username: username.current.value,
                pwd: pwd.current.value,
                old_pwd: old_pwd.current.value,
                confirm_pwd: confirm_pwd.current.value,
                group_id: groupIdAdd,
                role: roleAdd
            })
            if (username.current.value.length <= 0) {
                setErrorText('error usernmae!')
                setError(true);
                return;
            }
            // if (old_pwd.current.value.length <= 0) {
            //     setErrorText('Need password for changes!')
            //     setError(true);
            //     // old_pwd.current.value = null
            //     // return;
            // }
            if (new_pwd.current.value != confirm_pwd.current.value && old_pwd.current.value.length > 0) {
                setErrorText("New password  doesn't match confirm password!")
                setError(true);
                return;
            }

            //for update password
            if (new_pwd.current.value.length > 0) {
                AddUpdateUser({
                    user_token: user.token,
                    id: info.id,
                    username: username.current.value,
                    old_pwd: old_pwd.current.value,
                    pwd: new_pwd.current.value,
                    confirm_pwd: confirm_pwd.current.value,
                    group_id: groupIdAdd,
                    role: roleAdd
                }).then(data => setRes(data));

                if (res.status != "SUCCESS") {
                    setErrorText(res.error)
                    setError(true);
                    return;
                }
            }
            //for update user info
            if (pwd.current.value.length > 0) {
                AddUpdateUser({
                    user_token: user.token,
                    id: info.id,
                    username: username.current.value,
                    old_pwd: pwd.current.value,
                    group_id: groupIdAdd,
                    role: roleAdd
                }).then(data => setRes(data));

                if (res.status !== "SUCCESS") {
                    setErrorText(res.error)
                    setError(true);
                    return;
                }
            }
            const controller = new AbortController();
            GetUsers({
                token: user.token, search: search, group_id: groupId,
                role: role, sort_order: 'asc', control: controller.signal
            })
                .then(data => { setUsers(data) })
            return () => {
                controller.abort();
            }
            setOpenUpdateDialog(false);
            console.log(res);
        };

        return (
            <Dialog
                open={openUpdateDialog}
                onClose={handleCloseDialogUpdate}
                fullWidth
                maxWidth='sm'
                scroll={'paper'}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Update user
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
                    <DialogTitle>Change user info (Require password to change infos)</DialogTitle>
                    <RoleAddDropDown {...{ role: info.role }} />
                    <GroupAddDropDown {...{ groupId: info.group_id }} />

                    {err && <Alert id="alert" severity="error">
                        <AlertTitle>{errText}</AlertTitle>
                    </Alert>}

                    <TextField
                        // disabled
                        inputRef={username}
                        defaultValue={info.username}
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
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined" />

                    <DialogTitle>Change password (Optional)</DialogTitle>
                    <TextField
                        // disabled
                        inputRef={old_pwd}
                        defaultValue={''}
                        margin="dense"
                        label="Old password"
                        type="password"
                        fullWidth
                        variant="outlined" />
                    <TextField
                        // disabled
                        inputRef={new_pwd}
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
        );
    })

    const RefreshList = () => {
        const controller = new AbortController();
        GetUsers({
            token: user.token, search: search, group_id: groupId,
            role: role, sort_order: 'asc', control: controller.signal
        })
            .then(data => { setUsers(data) })
        return () => {
            controller.abort();
        }
    }
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
                    sx={{ height: 55, marginTop: 1, marginLeft: 1 }}>Add User <PersonAddAltIcon />
                </Button>
                <Button color="success" variant="outlined" onClick={(event) => {
                    RefreshList();
                }}
                    sx={{ height: 55, marginTop: 1, marginLeft: 1 }}>
                    <CachedIcon />
                </Button>
                <DisplayContent />
            </Container>
            <UpdateUserDialog {...selectedUser} />
            <AddUserDialog {...{ role: "Student" }} />
        </>
    )
}
