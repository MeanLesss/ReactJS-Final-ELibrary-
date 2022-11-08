import React, { useCallback, useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { GetSummary } from '../AuthServices';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { SettingsSharp } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import '../Teacher/Teacher.css'


export default function LibrarianDash() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [Groups, setGroups] = useState(0);
  const [Books, setBooks] = useState(0);
  const [Students, setStudents] = useState(0);
  const [Teachers, setTeachers] = useState(0);
  const [Downloads, setDownloads] = useState(0);


  useEffect(() => {
    GetSummary({ api_token: process.env.REACT_APP_API_TOKEN, user_token: user.token })
      .then(data => {
        if (data.status === 'SUCCESS') {
          setGroups(data.summary.groups);
          setBooks(data.summary.books);
          setStudents(data.summary.students);
          setTeachers(data.summary.teachers);
          setDownloads(data.summary.downloads);
        } else {
          setGroups('Error cannot find data');
          setBooks('Error cannot find data');
          setStudents('Error cannot find data');
          setTeachers('Error cannot find data');
          setDownloads('Error cannot find data');
        }
      })

  }, [(process.env.REACT_APP_API_TOKEN),]);
  const ShowMore = (e, navLink) => {
    navigate(navLink, { replace: true });
  }

  // console.log(summary);
  const DisplayCard = useCallback((props) => {
    let link = `/librarian/${props.title}`;

    // if (props.title.includes('groups')) {
    //   link = '/librarian/groups'
    // } else {
    //   link = '/librarian/books'
    // }
    return (
      <Grid {...{ xs: 12, sm: 6, md: 6, lg: 6 }}
        minHeight={160} >
        <Card>
          <CardContent >
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {props.title}
            </Typography>
            <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', fontSize: 50 }}>
              {props.count}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={event => ShowMore(event, link)}>Show More</Button>
          </CardActions>
        </Card>
      </Grid>

    )
  })
  //render the interface
  return (
    <>
      {/* <div>LibrarianDash</div> */}
      <section id="breadCrumbs">
        <Breadcrumbs aria-label="breadcrumb"

          separator={<NavigateNextIcon fontSize="large" />}>
          <Typography color="text.primary">...</Typography>

          <Typography color="text.primary" fontSize="20pt">Dashboard</Typography>
        </Breadcrumbs>
      </section>
      <div id="sum-wrapper">
        <Container>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container
              spacing={2}>
              <DisplayCard  {...{ title: 'Books', count: Books }} />
              <DisplayCard  {...{ title: 'Groups', count: Groups }} />
              <DisplayCard  {...{ title: 'Students', count: Students }} />
              <DisplayCard  {...{ title: 'Teachers', count: Teachers }} />
              <DisplayCard  {...{ title: 'Downloads', count: Downloads }} />
            </Grid>
          </Box>
          <Outlet />
        </Container>
      </div>
    </>
  )
}
