import React, { useState , useCallback ,useEffect } from 'react'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CloseIcon from '@mui/icons-material/Close';
import { GetGroupLibrarian } from '../AuthServices';

export default function LibGroups() {

  const userToken = JSON.parse(localStorage.getItem('user'));
  const [search, setSearch] = useState();
  const [groups, setGroups] = useState();

  useEffect(()=>{
    GetGroupLibrarian({token:userToken.token , search:search}).then((data) => setGroups(data))
  },[search])
  console.log(groups);

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
      </Card>
    )
  })
  const DisplayContent = useCallback((event) => {

    if (groups != null && groups.groups.length > 0) {
      return (
        <Container sx={{ flexGrow: 1, p: 2 }}>
          <h1>All Groups</h1>
          <Grid
            container
            spacing={2}>
            {[...groups.groups].map((group) => (
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
    } else {
      return (
        <Container>
          <h1>No user found in this group</h1>
        </Container>
      )
    }
  })

  return (
    <>
      <Container>
        <h1>Manage Groups</h1>
        <TextField id="outlined-basic" label="Search group" variant="outlined"
          sx={{ marginTop: 1 }}
          onChange={(e) => { setSearch(e.target.value) }} />
        <Button color="success" variant="outlined" onClick={(event) => {
          // handleClickOpen();
          // setSelectedUser(null);
        }}
          sx={{ height: 55, marginTop: 1, marginLeft: 1 }}>Add Group <PersonAddAltIcon /></Button>
        <DisplayContent />
      </Container>
    </>
  )
}
