import React from 'react'
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';

export default function TeachStudent() {
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

        <Container>
            <h1>All Students</h1>
        </Container>
    </>
  )
}
