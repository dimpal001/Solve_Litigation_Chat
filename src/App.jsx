import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './Webpages/Chat'
import LawyerList from './Webpages/LawyerList'
import ChatList from './Webpages/ChatList'
import UserProfile from './Webpages/UserProfile'

const sampleLawyer = {
  name: 'John Doe',
  specialty: 'Criminal Law',
  avatar: 'https://via.placeholder.com/150',
  bio: 'John Doe is an experienced criminal lawyer with over 20 years of practice. He has handled numerous high-profile cases and is known for his dedication and expertise.',
  email: 'john.doe@example.com',
  phone: '(123) 456-7890',
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LawyerList />} />
          <Route path='/lawyer' element={<ChatList />} />
          <Route path='/chat/:userId' element={<Chat />} />
          <Route
            path='/profile/:userId'
            element={<UserProfile lawyer={sampleLawyer} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
