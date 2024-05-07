import { Navigate, Route, Routes } from 'react-router-dom'
import EditPlayer from './components/EditPLayer'
import { lazy } from 'react';

const Team = lazy(() => import('./components/Team'));


function TeamPage() {

  
  return (

    <>
    test
    </>
    // <Routes>
    //   <Route path='/'>
    //     <Route index element={<Team />} />
    //     <Route path='editPlayer' element={<EditPlayer />} />
    //     <Route path=':teamId/*' element={<Navigate to='/' />} />
    //   </Route>
    // </Routes>


  )

}

export default TeamPage
