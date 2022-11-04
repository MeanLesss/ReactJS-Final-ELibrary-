import React, { useCallback, useState, useEffect } from 'react'
import { GetGroupList, GetSummary } from '../AuthServices';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Outlet, useNavigate } from 'react-router-dom';
import '../Teacher/Teacher.css'

export default function TeacherDash() {

  const navigate = useNavigate();
  const teacher = JSON.parse(localStorage.getItem('user'));
  const [groups, setGroups] = useState(0);
  const [books, setBooks] = useState(0);


  //test command
  //here we use useEffect to get Non-promise data the set what need
  useEffect(() => {
    GetSummary({ api_token: process.env.REACT_APP_API_TOKEN, user_token: teacher.token })
      .then(data => {
        if (data.status === 'SUCCESS') {
          setGroups(data.summary.groups);
          setBooks(data.summary.books);
        } else {
          setGroups('Error cannot find data');
          setBooks('Error cannot find data');
        }
      })

      GetGroupList(teacher.token).then(data => localStorage.setItem('groups',JSON.stringify(data)));
  }, [(process.env.REACT_APP_API_TOKEN), (teacher.token)]);


  const ShowMore = (e, navLink) => {
    navigate(navLink, { replace: true });
  }

  // console.log(summary);
  const DisplayCard = useCallback((props) => {
    let link;
    if (props.title.includes('groups')) {
      link = '/teacher/groups'
    } else {
      link = '/teacher/books'
    }
    return (
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
    )
  })

  return (
    <>
      <section id="breadCrumbs">
        <Breadcrumbs aria-label="breadcrumb" 
        
        separator={<NavigateNextIcon fontSize="large" />}>
          <Typography color="text.primary">...</Typography>
        
          <Typography color="text.primary" fontSize="20pt">Dashboard</Typography>
        </Breadcrumbs>
      </section>

      <div id="sum-wrapper">
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              {...{ xs: 12, sm: 6, md: 6, lg: 6 }}
              minHeight={160}
            >
              <DisplayCard  {...{ title: 'Number of groups:', count: groups }} />
            </Grid>
            <Grid
              {...{ xs: 12, sm: 6, md: 6, lg: 6 }}
              minHeight={160}
            >
              <DisplayCard {...{ title: 'Number of books:', count: books }} />
            </Grid>
          </Grid>
        </Box>
      </div>
      <Outlet />
    </>
  )
}
