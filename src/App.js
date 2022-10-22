import {  React,createRef, useCallback } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import logo2 from './Images/logo2.gif';
import { GetLogin } from './AuthServices';

export default function LogIn() {

  const Username = createRef();
  const Password = createRef();

  const DoSubmit = (e)=>{
    e.preventDefault();
    const Submit = useCallback(()=>{
      GetLogin({})
    })

  }

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
        <br/>
        <form onSubmit={DoSubmit}>
          <h1>Log in</h1> <br />
          <TextField
          ref={Username}
            id="outlined-textarea"
            label="Username"
            placeholder="Username"
            color="secondary"
          />
          <br /><br />
          <TextField
          ref={Password}
            type="password"
            id="outlined-textarea"
            label="Password"
            placeholder="password"
            color="secondary"
          />
          <br /><br />
          <Button type="submit" variant="contained" color="secondary" endIcon={<LoginIcon />}>
            Log in
          </Button>
        </form>
      </div>
    </>

  )
}
