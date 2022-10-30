import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';


export default function TeacherBooks() {

  return (
    <>
      <section id="breadCrumbs">
        <Breadcrumbs aria-label="breadcrumb"

          separator={<NavigateNextIcon fontSize="large" />}>
          <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/teacher/Dashboard"
          >
            Home
          </Link>

          <Typography color="text.primary" fontSize="20pt">Books</Typography>
        </Breadcrumbs>
      </section>
      <div>TeacherBooks</div>
    </>
  )
}
