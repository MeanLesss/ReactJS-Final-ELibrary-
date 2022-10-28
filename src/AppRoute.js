import React from 'react'
import { Routes,Route } from 'react-router-dom'
import LogIn from './App'
import Layout from './Layout'
import LibrarianDash from './Librarian/LibrarianDash'
import TeacherDash from './Teacher/TeacherDash'
import TeachGroups from './Teacher/TeachGroups'

export default function AppRoute() {
  return (
        <Routes>
            <Route path='/' element={<LogIn/>}></Route>
            <Route path='teacher' element={<Layout/>}>
                <Route index element={<TeacherDash/>}></Route>
            </Route>
            <Route path='teacher/groups' element={<Layout/>}>
                <Route element={<TeacherDash/>}>
                    <Route index element={<TeachGroups/>}></Route>
                </Route>
            </Route>
            <Route path = 'librarian' element={<Layout/>}>
                <Route index element={<LibrarianDash/>}></Route>
            </Route>
            <Route path='*' element={<h1>Not Found!</h1>}></Route>
        </Routes>
  )
}
