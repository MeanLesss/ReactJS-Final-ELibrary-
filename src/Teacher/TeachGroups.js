import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import { GetGroupList } from '../AuthServices';

export default function TeachGroups() {

  let [groupList, setGroupList] = useState([]);
  let userToken = localStorage.getItem('user');

  useEffect(() => {
    GetGroupList(userToken.token).then(data => setGroupList([data]));
    ;
  }, [userToken.token])
  console.log(groupList);

  return (
    <>
      <section id="breadCrumbs">
        <Breadcrumbs aria-label="breadcrumb"

          separator={<NavigateNextIcon fontSize="large" />}>
          <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/teacher/Dashboard"
          >
            Home
          </Link>

          <Typography color="text.primary" fontSize="20pt">Groups</Typography>
        </Breadcrumbs>
      </section>

      <div>TeachGroups</div>
    </>
  )
}
