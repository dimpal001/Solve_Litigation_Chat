import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './Webpages/Chat'
import ChatList from './Webpages/ChatList'
import UserProfile from './Webpages/UserProfile'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ChatList />} />
          <Route path='/chat/:userId' element={<Chat />} />
          <Route path='/profile/:userId' element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
