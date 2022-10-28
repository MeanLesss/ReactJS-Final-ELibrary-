import React, { useCallback, useState, useEffect } from 'react'
import { GetSummary } from '../AuthServices';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Outlet, useNavigate } from 'react-router-dom';
import '../Teacher/Teacher.css'

export default function TeacherDash() {

  const navigate = useNavigate();
  const teacher = JSON.parse(localStorage.getItem('user'));
  const [summary, setSummary] = useState({});
  const [groups, setGroups] = useState(0);
  const [books, setBooks] = useState(0);
  let [link, setLink] = useState('');

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
  }, [(process.env.REACT_APP_API_TOKEN), (teacher.token)]);


  const ShowMore = useCallback((link)=>{
    navigate('/teacher/groups',{replace:true});
  })

  // console.log(summary);
  const DisplayCard = useCallback((props) => {
    if (props.title.includes('groups')) {
      setLink = 'teacher/groups'
    } else {
      setLink = 'teacher/books'
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
           {/* onClick={ShowMore(link)} */}
          <Button size="small" onClick={ShowMore}>Show More</Button>
        </CardActions>
      </Card>
    )
  })

  return (
    <>
      <div>
        This need another nav bar just a thin 1
        <nav>
          <ul>
            <li>Books</li>
            <li>Groups</li>
            <li>Profile</li>
          </ul>
        </nav>
      </div>
      <div id="sum-wrapper">
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid
            container
            spacing={2}
            sx={{
              '--Grid-borderWidth': '1px',
              borderTop: 'var(--Grid-borderWidth) solid',
              borderLeft: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',
              '& > div': {
                borderRight: 'var(--Grid-borderWidth) solid',
                borderBottom: 'var(--Grid-borderWidth) solid',
                borderColor: 'divider',
              },
            }}
          >
            <Grid
              {...{ xs: 12, sm: 6, md: 4, lg: 6 }}
              minHeight={160}
            >
              <DisplayCard  {...{ title: 'Number of groups:', count: groups }} />
            </Grid>
            <Grid
              {...{ xs: 12, sm: 6, md: 4, lg: 6 }}
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
