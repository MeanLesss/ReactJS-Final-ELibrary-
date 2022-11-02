import React, { useEffect, useState, useCallback } from 'react'
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';

export default function TeachStudent() {

    const [students, setStudents] = useState(JSON.parse(localStorage.getItem('students')));

    console.log(students);

    //render the student list
    const DisplayContent = useCallback(() => {
        // students.students.length > 0 ||
        if (students != null && students.students.length > 0) {
            return (
                <Container>
                    <h1>All Students</h1>
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
        </>
    )

}
