import React, { useState, useCallback, useEffect, createRef } from 'react'
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DialogTitle from '@mui/material/DialogTitle';
import { AddUpdateGroup, GetGroupLibrarian } from '../AuthServices';
import { Hidden } from '@mui/material';

export default function LibGroups() {

  const userToken = JSON.parse(localStorage.getItem('user'));
  const [search, setSearch] = useState();
  const [groups, setGroups] = useState();
  const [selectGroup, setSelectedGroup] = useState();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);


  useEffect(() => {
    GetGroupLibrarian({ token: userToken.token, search: search }).then((data) => setGroups(data))
  }, [search])
  // console.log(groups);

  const UpdateGroup = (group) => {
    setOpenUpdateDialog(true);
  }

  const GroupCard = useCallback((prop) => { //render the card style
    return (
      <Card>
        <CardContent >
          <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
            ID : {prop.id}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'clip',
              display: 'flex',
              justifyContent: 'center',
              fontSize: 30,
              backgroundColor: 'lightgreen',
              borderRadius: '5px'
            }}>
            {prop.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="/small" onClick={event => {
            setSelectedGroup(prop);
            UpdateGroup(event, { id: prop.id, group_name: prop.title })
          }}>
            Update
          </Button>
        </CardActions>
      </Card >
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

  const [err, setError] = useState(false);
  const [errText, setErrorText] = useState('');

  const handleClickOpen = (e) => {
    setOpenAddDialog(true);
    // e.preventDefault();
  };
  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setError(false);
  };
  const handleClickOpenUpdate = (e) => {
    setOpenUpdateDialog(true);
    e.preventDefault();
  };
  const handleCloseDialogUpdate = () => {
    setOpenUpdateDialog(false);
    setError(false);
  };

  const UpdateGroupDialog = useCallback((info) => {
    const name = createRef('');
    const handleSubmit = async (e) => {
      e.preventDefault();
      var res = await AddUpdateGroup({
        group_id: info.id,
        token: userToken.token,
        name: name.current.value,
      });
      if (res.status !== "SUCCESS") {
        setErrorText(res.error);
        setError(true);
        return;
      }
      GetGroupLibrarian({ token: userToken.token, search: search }).then((data) => setGroups(data))
      setOpenUpdateDialog(false);
      // console.log(res);
    };
    // console.log(info)

    return (
      <Dialog
        open={openUpdateDialog}
        fullWidth
        maxWidth='sm'
        scroll={'paper'}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Update Group
          <DialogActions>
            <CloseIcon onClick={handleCloseDialogUpdate}>Close</CloseIcon>
          </DialogActions>
        </DialogTitle>
        {/* for the profile pic */}
        <DialogContent sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          {err && <Alert id="alert" severity="error">
            <AlertTitle>{errText}</AlertTitle>
          </Alert>}

          <TextField
            // disabled
            inputRef={name}
            defaultValue={info.title}
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined" />
        </DialogContent>
        <Button onClick={(e) => {
          handleSubmit(e)
        }}>Save</Button>
      </Dialog>
    );
  })
  const AddGroupDialog = useCallback((info) => {
    const name = createRef('');
    const handleSubmit = async (e) => {
      e.preventDefault();
      var res = await AddUpdateGroup({
        token: userToken.token,
        name: name.current.value,
      });
      if (res.status !== "SUCCESS") {
        setErrorText(res.error);
        setError(true);
        return;
      }
      GetGroupLibrarian({ token: userToken.token, search: search }).then((data) => setGroups(data))
      setOpenAddDialog(false);
      // console.log(info);
    };

    return (
      <Dialog
        open={openAddDialog}
        fullWidth
        maxWidth='sm'
        scroll={'paper'}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Add Group
          <DialogActions>
            <CloseIcon onClick={handleCloseDialog}>Close</CloseIcon>
          </DialogActions>
        </DialogTitle>
        {/* for the profile pic */}
        <DialogContent sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          {err && <Alert id="alert" severity="error">
            <AlertTitle>{errText}</AlertTitle>
          </Alert>}

          <TextField
            // disabled
            inputRef={name}
            // defaultValue={info.name}
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined" />
        </DialogContent>
        <Button onClick={(e) => {
          handleSubmit(e)
        }}>Save</Button>
      </Dialog>
    );
  })
  // , [openAddDialog, handleCloseDialog, err, errText,]
  //return actuall interface
  return (
    <>
      <Container>
        <h1>Manage Groups</h1>
        <TextField id="outlined-basic" label="Search group" variant="outlined"
          sx={{ marginTop: 1 }}
          onChange={(e) => { setSearch(e.target.value) }} />
        <Button color="success" variant="outlined" onClick={(event) => {
          handleClickOpen();
          setSelectedGroup(null);
        }}
          sx={{ height: 55, marginTop: 1, marginLeft: 1 }}>
          Add Group
          <PersonAddAltIcon />
        </Button>
        {/* call a  function to display */}
        <DisplayContent />
      </Container>
      <UpdateGroupDialog {...selectGroup} />
      <AddGroupDialog {...selectGroup} />
    </>
  )
}
