import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LogIn from './App'
import Layout from './Layout'
import LibGroups from './Librarian/LibGroups'
import LibLayout from './Librarian/LibLayout'
import LibrarianDash from './Librarian/LibrarianDash'
import LibUsers from './Librarian/LibUsers'
import TeacherBooks from './Teacher/TeacherBooks'
import TeacherDash from './Teacher/TeacherDash'
import TeacherLayout from './Teacher/TeacherLayout'
import TeachGroups from './Teacher/TeachGroups'
import TeachStudent from './Teacher/TeachStudent'

export default function AppRoute() {
    return (
        <Routes>
            {/* Teacher navigation */}

            <Route path='/' element={<LogIn />}></Route>

            <Route path='teacher/dashboard' element={<Layout />}>
                <Route element={<TeacherLayout />}>
                    <Route index element={<TeacherDash />}></Route>
                </Route>
            </Route>
            {/* display all groups for teacher*/}
            <Route path='teacher/groups' element={<Layout />}>
                <Route element={<TeacherLayout />}>
                    <Route index element={<TeachGroups />}></Route>
                </Route>
            </Route>
            {/* students from the group selected */}
            <Route path='teacher/groups/students' element={<Layout />}>
                <Route element={<TeacherLayout />}>
                    <Route index element={<TeachStudent />}></Route>
                </Route>
            </Route>

            <Route path='teacher/books' element={<Layout />}>
                <Route element={<TeacherLayout />}>
                    <Route index element={<TeacherBooks />}></Route>
                </Route>
            </Route>
            {/* Librarian navigation */}
            <Route path='librarian/dashboard' element={<Layout />}>
                <Route element={<LibLayout/>}>
                    <Route index element={<LibrarianDash />}></Route>
                </Route>
            </Route>

            <Route path='librarian/groups' element={<Layout />}>
                <Route element={<LibLayout/>}>
                    <Route index element={<LibGroups/>}></Route>
                </Route>
            </Route>
            <Route path='librarian/books' element={<Layout />}>
                <Route element={<LibLayout/>}>
                    <Route index element={<h1>books</h1>}></Route>
                </Route>
            </Route>
            <Route path='librarian/users' element={<Layout />}>
                <Route element={<LibLayout/>}>
                    <Route index element={<LibUsers/>}></Route>
                </Route>
            </Route>
            <Route path='librarian/teachers' element={<Layout />}>
                <Route element={<LibLayout/>}>
                    <Route index element={<h1>teacher</h1>}></Route>
                </Route>
            </Route>
            <Route path='librarian/downloads' element={<Layout />}>
                <Route element={<LibLayout/>}>
                    <Route index element={<h1>Download!</h1>}></Route>
                </Route>
            </Route>
          
            <Route path='*' element={<h1>Not Found!</h1>}></Route>
        </Routes>
    )
}
