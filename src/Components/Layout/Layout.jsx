import React from 'react'
import Header from '../Home Page/Header/Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <Header/>
    <Outlet />
    </div>
  )
}
