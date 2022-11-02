import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LogIn from './App'
import Layout from './Layout'
import LibrarianDash from './Librarian/LibrarianDash'
import TeacherBooks from './Teacher/TeacherBooks'
import TeacherDash from './Teacher/TeacherDash'
import TeacherLayout from './Teacher/TeacherLayout'
import TeachGroups from './Teacher/TeachGroups'
import TeachStudent from './Teacher/TeachStudent'

export default function AppRoute() {
    return (
        <Routes>
            <Route path='/' element={<LogIn />}></Route>

            <Route path='teacher/dashboard' element={<Layout />}>
                <Route element={<TeacherLayout />}>
                    <Route index element={<TeacherDash />}></Route>
                </Route>
            </Route>
            {/* display  all groups */}
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
            <Route path='librarian' element={<Layout />}>
                <Route index element={<LibrarianDash />}></Route>
            </Route>
            <Route path='*' element={<h1>Not Found!</h1>}></Route>
        </Routes>
    )
}
