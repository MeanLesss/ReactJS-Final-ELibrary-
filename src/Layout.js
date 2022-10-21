import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        {/* this part should have nav bar */}
        layout
        <Outlet/>
    </div>
  )
}
