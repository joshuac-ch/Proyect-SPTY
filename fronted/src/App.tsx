import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/Auth/AuthPage';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import MainLayout from './layout/MainLayout';
import ChatPage from './pages/ChatPage';
import AlbumPage from './pages/album/AlbumPage';

function App() {
 
  return (
    <>     
    <Routes>
    
      <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth"}/>}></Route>
      <Route path='/auth' element={<AuthPage></AuthPage>}></Route>
      <Route element={<MainLayout></MainLayout>}>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/chat' element={<ChatPage></ChatPage>}></Route>
          <Route path='/albums/:albumID' element={<AlbumPage></AlbumPage>}></Route>

      </Route>
    </Routes>

    </>
  )
}

export default App
