import { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../Components/Apis'
import { useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'
import User from '../assets/user.svg'
import { SLButton } from '../Components/Customs'

const LawyerList = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [list, setList] = useState([])
  const { user, setUser } = useContext(UserContext)

  const fetchChattedList = async () => {
    const userId = user._id
    try {
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

  const addDataToList = (newData) => {
    setList((prevList) => prevList.concat(newData))
  }

  const fetchLawyerList = async () => {
    const userId = user._id
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/message/lawyer-list`,
        {
          params: { userId },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      addDataToList(response.data)
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
        window.location.href = 'https://www.solvelitigation.com'
        return
      }
    }
  }, [location, navigate])

  const handleClick = (id) => {
    navigate(`/chat/${id}`)
  }

  const handleCheckProfile = () => {
    navigate(`/l-profile`)
  }

  return (
    <div className='container mx-auto py-7 px-2 lg:px-[280px]'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold mb-4'>Lawyers</h1>
        <div className='flex gap-5'>
          <select className='p-2 rounded-sm'>
            <option value='state'>Select state</option>
            <option value='state'>Select state</option>
            <option value='state'>Select state</option>
          </select>
          <select className='p-2 rounded-sm'>
            <option value='state'>Select district</option>
          </select>
          <SLButton
            onClick={fetchLawyerList}
            title={'Lwyer List'}
            variant={'primary'}
          />
        </div>
      </div>
      <div className='flex lg:gap-5 gap-2 flex-col'>
        {list.map((lawyer) => (
          <div
            key={lawyer.id}
            className='flex items-center p-4 bg-white border border-zinc-200 shadow rounded-lg cursor-pointer'
          >
            <img
              onClick={handleCheckProfile}
              src={User}
              alt={lawyer.name}
              className='w-16 h-16 rounded-full mr-4'
            />
            <div
              onClick={() => handleClick(lawyer._id)}
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
  )
}

export default LawyerList
