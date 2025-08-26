import { useRoutes } from 'react-router-dom'
import Home from './pages/landing_page'
import ChatRoomWrapper from './pages/chat/chats'
import Navbar from './components/layouts/navbar'
import Sidebar from './components/layouts/sidebar/sidebar'
import Footer from './components/layouts/footer'

function App() {
  return (
    <div className='w-full flex'>
      <Sidebar />
      <main className="flex-1 w-full h-[100vh] flex flex-col">
        <Navbar />
        <div className='flex-1 overflow-hidden'>
          <CustomRoute />
        </div>
        <footer className="w-full  flex items-center justify-center py-1 z-50">
          <Footer />
        </footer>
      </main>
    </div>

  )
}

function CustomRoute() {
  const element = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: "/chats/:id",
      element: <ChatRoomWrapper />
    }
  ])

  return element
}

export default App
