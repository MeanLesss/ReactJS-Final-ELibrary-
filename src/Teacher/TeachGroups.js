import React, { useEffect, useState, useCallback } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import { GetGroupList } from '../AuthServices';

export default function TeachGroups() {

  let [groupList, setGroupList] = useState();
  let userToken = localStorage.getItem('user');

  useEffect(() => {
    GetGroupList(userToken.token).then(data => setGroupList(data));
  }, [userToken.token])
  console.log(groupList);


  const GroupCard = useCallback((props) => {
    let link;
    // if (props.title.includes('groups')) {
    //   link = '/teacher/groups'
    // } else {
    //   link = '/teacher/books'
    // }
    return (
      <Card>
        <CardContent >
          <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
            ID : {props.count}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'center', 
              fontSize: 30, 
              backgroundColor: 'lightgreen',
              borderRadius: '5px'
            }}>
            {props.title}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small" onClick={event => ShowMore(event, link)}>Show More</Button> */}
        </CardActions>
      </Card>
    )
  })


  return (
    <>
      <section id="breadCrumbs">
        <Breadcrumbs aria-label="breadcrumb"

          separator={<NavigateNextIcon fontSize="large" />}>
          <Link
            underline="hover"
            color="inherit"
            href="/teacher/Dashboard"
          >
            Home
          </Link>

          <Typography color="text.primary" fontSize="20pt">Groups</Typography>
        </Breadcrumbs>
      </section>

      <h1>All Groups</h1>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid
          container
          spacing={2}>
          {[...Array(12)].map((_, i) => (
            <Grid
              {...{ xs: 6, sm: 6, md: 6, lg: 4 }}
              minHeight={160}>
              <GroupCard  {...{ title: 'Group:' + (i + 1), count: i + 1 }} />
            </Grid>
          ))}
        </Grid>
      </Box>

    </>
  )
}
