import React, { useEffect, useState, useCallback } from 'react'
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
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
import { GetUsers } from '../AuthServices'

export default function LibUsers() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [users, setUsers] = useState();
    const [groupId, setGroupId] = useState(1);
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('Student');
    const roles = ['Student', 'Teacher', 'Librarian']

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
    console.log(users);

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
                            <TableBody>
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
                                            <Button><EditIcon /></Button> /
                                            <Button><DeleteIcon /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )
        } else {
            return (
                <Container>
                    <h1>No book found in this group</h1>
                </Container>
            )
        }
    })

    const RoleDropDown = () => {
        const handleChange = (event) => {
            // getBooks({ id: event.target.value, search: '' })
            setRole(event.target.value);
            // console.log(event.target.value);
        };
        return (

            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Roles</InputLabel>
                <Select onChange={handleChange} defaultValue={'Student'} id="grouped-select" label="Role">
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


    //render the actual display
    return (
        <>
            <Container>
                <h1>Manage Users</h1>
                <RoleDropDown />
                <DisplayContent />
            </Container>
        </>
    )
}
