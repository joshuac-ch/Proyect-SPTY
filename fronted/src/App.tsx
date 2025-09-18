import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/Auth/AuthPage';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import MainLayout from './layout/MainLayout';
import ChatPage from './pages/ChatPage';
import AlbumPage from './pages/album/AlbumPage';
import AdminPage from './pages/admin/AdminPage';
import {Toaster} from "react-hot-toast"
import ErrorPage from './pages/ErrorPage';
function App() {
 
  return (
    <>     
    <Routes>
      
      <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth"}/>}></Route>
      <Route path='/auth' element={<AuthPage></AuthPage>}></Route>
      <Route path='/admin' element={<AdminPage></AdminPage>}></Route>
      <Route element={<MainLayout></MainLayout>}>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/chat' element={<ChatPage></ChatPage>}></Route>
          <Route path='/albums/:albumID' element={<AlbumPage></AlbumPage>}></Route>
          <Route path='/*' element={<ErrorPage></ErrorPage>}></Route>

      </Route>
    </Routes>
    <Toaster></Toaster>
    </>
  )
}

export default App
