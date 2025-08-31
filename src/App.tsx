import { Route, Routes } from 'react-router-dom'
import Home from './pages/landing_page'
import ChatRoomWrapper from './pages/chat/chats'
import Default from './pages/unauthorized'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'

function App() {
  return <Routes>
    <Route element={<Login />} path='/auth/sign-in' />
    <Route element={<Signup />} path='/auth/sign-up' />
    <Route element={<Default />}>
      <Route path='/' element={<Home />} />
      <Route path='/chats/:id' element={<ChatRoomWrapper />} />
    </Route>
  </Routes>
}




export default App
