import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { api } from '../Components/Apis'
import { UserContext } from '../UserContext'
import Lawyer from '../assets/lawyer.svg'

const ChatList = () => {
  const [list, setList] = useState([])
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  const fetchChattedList = async () => {
    try {
      const userId = user._id
      const response = await axios.get(
        `${api}/api/solve_litigation/message/chatted-users`,
        {
          params: { userId },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      setList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchChattedList()
    const queryParams = new URLSearchParams(location.search)
    const tokenFromParams = queryParams.get('token')
    const userFromParams = queryParams.get('user')

    const tokenFromStorage = sessionStorage.getItem('token')
    const userFromStorage = sessionStorage.getItem('user')

    if (!tokenFromStorage || !userFromStorage) {
      if (tokenFromParams && userFromParams) {
        const decodedUser = JSON.parse(decodeURIComponent(userFromParams)) // Parse decodedUser directly
        sessionStorage.setItem('token', tokenFromParams)
        sessionStorage.setItem('user', JSON.stringify(decodedUser)) // Store decodedUser as JSON object
        setUser(decodedUser)

        navigate('/')
      } else {
        window.location.href = 'https://www.chat.solvelitigation.com'
        return
      }
    }
  }, [location, navigate])

  useEffect(() => {
    fetchChattedList()
  }, [])

  const handleUserClick = (userId) => {
    navigate(`/chat/${userId}`)
  }

  return (
    <div>
      <div className='container mx-auto py-7 px-2 lg:px-[280px]'>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl font-bold mb-4'>Chats</h1>
          <div className='flex gap-5'>
            <select className='p-2 rounded-sm'>
              <option value='state'>Select state</option>
              <option value='state'>Select state</option>
              <option value='state'>Select state</option>
            </select>
            <select className='p-2 rounded-sm'>
              <option value='state'>Select district</option>
            </select>
          </div>
        </div>
        <div className='mt-4 flex flex-col gap-3'>
          {list.map((lawyer) => (
            <div
              key={lawyer.id}
              className='flex items-center p-4 bg-white border border-zinc-200 shadow rounded-lg cursor-pointer'
            >
              <img
                // onClick={handleCheckProfile}
                src={Lawyer}
                alt={lawyer.name}
                className='w-16 h-16 rounded-full mr-4'
              />
              <div
                onClick={() => handleUserClick(lawyer._id)}
                className='group w-full'
              >
                <h2 className='text-xl font-semibold group-hover:text-primary group-hover:underline'>
                  {lawyer.fullName}
                  <span className='font-light text-base'>
                    {' '}
                    | {lawyer.specialty}
                  </span>
                </h2>
                <p className='text-gray-600'>Assam | Barpeta</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatList
