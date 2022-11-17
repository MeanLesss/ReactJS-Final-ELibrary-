import React, { useState, useCallback, useEffect , createRef } from 'react'
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
import { GetGroupLibrarian } from '../AuthServices';

export default function LibGroups() {

  const userToken = JSON.parse(localStorage.getItem('user'));
  const [search, setSearch] = useState();
  const [groups, setGroups] = useState();

  useEffect(() => {
    GetGroupLibrarian({ token: userToken.token, search: search }).then((data) => setGroups(data))
  }, [search])
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

  const AddGroupDialog = useCallback((info) => {
    const name = createRef('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log({
        //     user_token: user.token,
        //     id: info.id,
        //     username: username.current.value,
        //     pwd: pwd.current.value,
        //     confirm_pwd: confirm_pwd.current.value,
        //     group_id: groupIdAdd,
        //     role: roleAdd
        // })

        // var res = await AddUpdateUser({
        //     user_token: user.token,
        //     // id: info.id,
        //     username: username.current.value,
        //     // old_pwd: old_pwd.current.value,
        //     pwd: pwd.current.value,
        //     confirm_pwd: confirm_pwd.current.value,
        //     group_id: groupIdAdd,
        //     role: roleAdd
        // });
        // if (res.status != "SUCCESS") {
        //     setErrorText(res.error)
        //     setError(true);
        //     return;
        // }
        setOpenAddDialog(false);
        // console.log(res);
    };

    return (
        <form>

            <Dialog
                open={openAddDialog}
                onClose={handleClose}
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
                    <RoleAddDropDown />
                    <GroupAddDropDown />

                    {err && <Alert id="alert" severity="error">
                        <AlertTitle>{errText}</AlertTitle>
                    </Alert>}

                    <TextField
                        // disabled
                        inputRef={name}
                        // defaultValue={info.username}
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="outlined" />
                </DialogContent>
                {/* <Button type="submit" onClick={(e) => { handleSubmit(e) }}>Save</Button> */}
            </Dialog>
        </form>
    );
}, [openAddDialog, handleCloseDialog, err, errText,])

  //return actuall interface
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
          sx={{ height: 55, marginTop: 1, marginLeft: 1 }}>
          Add Group
          <PersonAddAltIcon />
        </Button>
        {/* call a  function to display */}
        <DisplayContent />
      </Container>
      <AddGroupDialog/>
    </>
  )
}
