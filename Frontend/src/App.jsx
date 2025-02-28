import React, { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import Dashboard from './pages/Dashboard'
import ViewApplications from './pages/viewApplications'
import ManageJobs from './pages/ManageJobs'
import AddJob from './pages/addJob'
import 'quill/dist/quill.snow.css'
import Create_Job from './components/Create_Job/Create_Job'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
      <Route path='/register' element={<Home />} />
      <Route path='/login' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='add-job' element={<AddJob />} />
          <Route path='manage-jobs' element={<ManageJobs />} />
          <Route path='view-applications' element={<ViewApplications />} />
        </Route>
        <Route path='/post-job' element={<Create_Job />} />

      </Routes>
   <Footer/>
    </div>
  )
}

export default App