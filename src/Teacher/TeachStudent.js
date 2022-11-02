import React, { useEffect, useState, useCallback } from 'react'
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TeachStudent() {

    const [students, setStudents] = useState(JSON.parse(localStorage.getItem('students')));
    const [ArrStudent, setArrStudent] = useState(students.students);


    // console.log(ArrStudent);

    // const Table = useCallback((props) => {
    //     return (
    //         <TableContainer component={Paper}>
    //             <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //                 <TableHead>
    //                     <TableRow>
    //                         <TableCell>ID</TableCell>
    //                         <TableCell align="right">Username</TableCell>
    //                         <TableCell align="right">Password</TableCell>
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                     {[...ArrStudent].map((student) => (
    //                         // <TableRow
    //                         //     key={student.id}
    //                         //     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    //                         //     <TableCell component="th" scope="row">
    //                         //         {student.id}
    //                         //     </TableCell>
    //                         //     <TableCell align="right">{student.username}</TableCell>
    //                         //     <TableCell align="right">{student.pwd}</TableCell>
    //                         // </TableRow>
    //                         <div>{student.username}</div>
    //                     ))}
    //                 </TableBody>
    //             </Table>
    //         </TableContainer>
    //     );
    // })
    console.log(ArrStudent);

    //render the student list
    const DisplayContent = useCallback((event) => {
        if (students != null && students.students.length > 0) {
            // setArrStudent(students.students);
            return (
                <Container>
                    <h1>All Students</h1>
                    <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Username</TableCell>
                            <TableCell align="center">Password</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...ArrStudent].map((student) => (
                            <TableRow
                                key={student.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {student.id}
                                </TableCell>
                                <TableCell align="center">{student.username}</TableCell>
                                <TableCell align="center">{student.pwd}</TableCell>
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
                    <h1>No student found in this group</h1>
                </Container>
            )
        }
    })

    //rener the actuall dom
    return (
        <>
            <section id="breadCrumbs">
                <Breadcrumbs aria-label="breadcrumb"

                    separator={<NavigateNextIcon fontSize="large" />}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/teacher/dashboard">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/teacher/groups">
                        Groups
                    </Link>
                    <Typography color="text.primary" fontSize="20pt">Students</Typography>
                </Breadcrumbs>
            </section>
            <DisplayContent />
            {/* <Table /> */}
            
        </>
    )

}
