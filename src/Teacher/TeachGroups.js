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
import Container from '@mui/material/Container';
import { GetGroupList, GetStudents } from '../AuthServices';
import { useNavigate } from 'react-router-dom';

export default function TeachGroups() {
  const navigate = useNavigate();
  let [groupList, setGroupList] = useState();
  let [students, setStudents] = useState();
  let userToken = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    localStorage.removeItem('students');
    let groups = JSON.parse(localStorage.getItem('groups'));
    setGroupList(groups)
    // GetGroupList(userToken.token).then(data => setGroupList(data));
  }, [userToken.token])
  // console.log(groupList);

  const ShowStudent = (event, props) => {
    // console.log(props);
    //**********then clear localStorage of students first before add the new student list */
    GetStudents({ group_id: props.id, user_token: userToken.token })
      .then(data => {
        if (data.status === 'SUCCESS') {
          localStorage.setItem('students', JSON.stringify(data));
          // setStudents(data);
        }
        // console.log(data);
      }).then(() => {
        if (localStorage.students != null) {
          //**********here need to navigate and save the student in localStorage */
          navigate('students', {state:{group_name:props.group_name}, replace: true })
        }
      })
  }

  const GroupCard = useCallback((props) => { //render the card style
    return (
      <Card>
        <CardContent >
          <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
            ID : {props.id}
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
          <Button size="/small" onClick={event => ShowStudent(event, 
            { id: props.id,group_name:props.title , user_token: userToken })}>
            Show Students
          </Button>
        </CardActions>
      </Card>
    )
  })
  //Display all group Card
  const DisplayContent = useCallback(() => {
    if (groupList) {
      return (
        <Container sx={{ flexGrow: 1, p: 2 }}>
          <h1>All Groups</h1>
          <Grid
            container
            spacing={2}>
            {[...groupList].map((group) => (
              <Grid
                key={group.id}
                {...{ xs: 12, sm: 6, md: 4, lg: 3 }}
                minHeight={160}>
                <GroupCard  {...{ title: group.name, id: group.id }} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )
    }
    else {
      return <Container><h1> Loading....</h1></Container>
    }
  });

  //render the actuall interface
  return (
    <>
      <section id="breadCrumbs">
        <Breadcrumbs aria-label="breadcrumb"

          separator={<NavigateNextIcon fontSize="large" />}>
          <Link
            underline="hover"
            color="inherit"
            href="/teacher/Dashboard">
            Home
          </Link>

          <Typography color="text.primary" fontSize="20pt">Groups</Typography>
        </Breadcrumbs>
      </section>

      <DisplayContent />
    </>
  )
}
