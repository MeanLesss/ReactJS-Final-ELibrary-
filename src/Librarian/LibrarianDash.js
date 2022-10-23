import React,{useCallback} from 'react'
import { useNavigate } from 'react-router-dom';

export default function LibrarianDash() {

  const navigate = useNavigate();
  const DoLogout = useCallback((e)=>{
    e.preventDefault();
    localStorage.clear();
    navigate('/',{replace:true});

  })

  return (
    <>
      <div>LibrarianDash</div>
      <button onClick={DoLogout}>Log out</button>
    </>
  )
}
