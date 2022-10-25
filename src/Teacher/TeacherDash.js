import React, { useCallback, useState, useEffect } from 'react'
import { GetSummary } from '../AuthServices';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../Teacher/Teacher.css'

export default function TeacherDash() {

  const teacher = JSON.parse(localStorage.getItem('user'));
  const [summary, setSummary] = useState({});
  const [groups, setGroups] = useState(0);
  const [books, setBooks] = useState(0);

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


  // console.log(summary);
  const DisplayCard = (props) => {
    return (
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', fontSize: 40 }}>
          {props.count}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>)
  };

  return (
    <>
      <div>
        This need another nav bat just a thin 1
      </div>
      <div id="sum-wrapper">
        <div id="summary-container">
          <Box id="box" sx={{
            // minWidth: 275,
            // maxWidth: 300,
            border: '1px solid red'
          }}>
            <Card variant="outlined">
              {/*here we using fucntion as JSX to call the element and pass param meter */}
              <DisplayCard {...{
                title: 'Number of Groups you in charge:',
                count: groups,
              }} />
            </Card>
          </Box>
          <Box id="box" sx={{
            // minWidth: 275,
            // maxWidth: 300,
            border: '1px solid red'
          }}>
            <Card variant="outlined">
              <DisplayCard {...{
                title: 'Number of Books you posted:',
                count: books,
              }} />
            </Card>
          </Box>
        </div>
      </div>

    </>
  )
}
