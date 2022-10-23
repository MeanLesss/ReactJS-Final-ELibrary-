import React, { createRef, useCallback, useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import logo2 from './Images/logo2.gif';
import { GetLogin } from './AuthServices';
import { ClassNames } from '@emotion/react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {useNavigate} from 'react-router-dom';

export default function LogIn() {
  const navigate = useNavigate();
  const name = createRef();
  const pass = createRef();
  const [err, setError] = useState(false);
  const [errText, setErrorText] = useState('');

  const DoSubmit = useCallback(async (e) => {
    e.preventDefault();
    const res = await GetLogin({ api_token: process.env.REACT_APP_API_TOKEN, name, pass })
    console.log(res)
    if (res.status != 'SUCCESS' || res == null) {
      setError(true);
      setErrorText(res.error);
      return;
    }
   
    localStorage.setItem('user',JSON.stringify(res));
    navigate('/'+res.user.role.toLowerCase(),{replace:true})


    setError(false);
  }, [name, pass])

  return (
    <>
      <div id="form-container">
        <div id="logo-container">
          <Avatar
            alt="ELibrary"
            src={logo2}
            sx={{ width: 100, height: 100 }}
          />
          <h2>MyStat library</h2>
        </div>
        <br />
        <form onSubmit={DoSubmit}>
          <h1>Log in 🏃‍♂️</h1> <br />
         
            {err && <Alert severity="error">
              <AlertTitle>{errText}</AlertTitle>
            </Alert>}
          <br />
          <TextField
            inputRef={name}
            id="outlined-textarea"
            label="Username"
            placeholder="Username"
            color="success"
          />
          <br /><br />
          <TextField
            inputRef={pass}
            type="password"
            id="outlined-textarea"
            label="Password"
            placeholder="password"
            color="success"
          />
          <br /><br />
          <Button type="submit" variant="contained" color="success" endIcon={<LoginIcon />}>
            Log in
          </Button>
        </form>
      </div>
    </>

  );
}
