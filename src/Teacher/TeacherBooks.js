import React, { useEffect, useState, useCallback, createRef } from 'react'
import Link from '@mui/material/Link';
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

import { GetBooks } from '../AuthServices';


export default function TeacherBooks() {
  // { books: [{ id: 1, title: 'sdfsf',path:'/uploads/01-PHP_Web_Programming.pdf' }] }
  const [books, setBooks] = useState();
  const user = JSON.parse(localStorage.getItem('user'));
  const groups = JSON.parse(localStorage.getItem('groups'));
  const [groupId, setGroupId] = useState(1);
  // console.log(groups)
  useEffect((event) => {
    GetBooks({ token: user.token, group_id: groups[0].id, search: '', sort: 'asc' })
      .then(data => { setBooks(data); });
  }, [user.token, groups[0].id]);
  // console.log(books);
  const getBooks = useCallback((info) => {
    GetBooks({ token: user.token, group_id: info.id, search: info.search, sort: 'asc' })
      .then(data => { setBooks(data); });
    // setBooks(b);
  }, [user.token]);

  const DisplayContent = useCallback((event) => {
    if (books != null && books.books.length > 0) {
      return (
        <Container>
          <h1>All Books</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...books.books].map((book) => (
                  <TableRow
                    key={book.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {book.id}
                    </TableCell>
                    <TableCell align="center">{book.title}</TableCell>
                    <TableCell align="center">
                      <a href={'http://172.104.166.110/FT_SD_M_11' + book.path + '?api_token=' + process.env.REACT_APP_API_TOKEN +
                          '&user_token=' + user.token}>
                        Download
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )
    } else {
      return (
        <Container>
          <h1>No book found in this group</h1>
        </Container>
      )
    }
  })

  //DropDown Groups
  const DropDown = useCallback(() => {

    const handleChange = (event) => {
      getBooks({ id: event.target.value, search: '' })
      setGroupId(event.target.value);
      // console.log(event.target.value);
    };

    // console.log(groups);
    if (groups) {
      return (
        <>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Groups</InputLabel>
            <Select onChange={handleChange} defaultValue={1} id="grouped-select" label="Grouping">
              {groups.map((g) => {
                return (
                  <MenuItem key={g.id} value={g.id}>
                    {g.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </>
      );
    }
  }, []);

  // return the actuall interface
  return (
    <>
      <section id="breadCrumbs">
        <Breadcrumbs aria-label="breadcrumb"

          separator={<NavigateNextIcon fontSize="large" />}>
          <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/teacher/Dashboard">
            Home
          </Link>

          <Typography color="text.primary" fontSize="20pt">Books</Typography>
        </Breadcrumbs>
      </section>

      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <DropDown />
        <TextField id="outlined-basic" label="Search book" variant="outlined"
          onChange={(e) => { getBooks({ id: groupId, search: e.target.value }) }} />
      </Container>

      <DisplayContent />
    </>
  )
}

