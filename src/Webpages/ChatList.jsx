import { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { api } from '../Components/Apis'
import { UserContext } from '../UserContext'
import Lawyer from '../assets/lawyer.svg'
import LeftArrow from '../assets/leftArrow.svg'
import RightArrow from '../assets/rightArrow.svg'
import MenuIcon from '../assets/menu.svg'
import Chat from './Chat'
import StateData from '../assets/states-and-districts.json'
import { SLButton } from '../Components/Customs'

const ChatList = () => {
  const [list, setList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [isLawyerList, setIsLawyerList] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, setUser } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(true)

  const fetchChattedList = async () => {
    try {
      setIsLawyerList(false)
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
      setFilteredList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchLawyerList = async () => {
    try {
      setIsMenuOpen(false)
      const userId = user._id
      const response = await axios.get(
        `${api}/api/solve_litigation/message/lawyer-list`,
        {
          params: { userId },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      setList([])
      setList(response.data)
      setFilteredList(response.data)
      setIsLawyerList(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log('Use Effect called')
    const queryParams = new URLSearchParams(location.search)
    const tokenFromParams = queryParams.get('token')
    const userFromParams = queryParams.get('user')

    const tokenFromStorage = sessionStorage.getItem('token')
    const userFromStorage = sessionStorage.getItem('user')

    if (!tokenFromStorage || !userFromStorage) {
      if (tokenFromParams && userFromParams) {
        const decodedUser = JSON.parse(decodeURIComponent(userFromParams))
        sessionStorage.setItem('token', tokenFromParams)
        sessionStorage.setItem('user', JSON.stringify(decodedUser))
        setUser(decodedUser)

        navigate('/')
      } else {
        window.location.href = 'https://www.solvelitigation.com'
        // window.location.href = 'http://localhost:5174'
        return
      }
    }
    fetchChattedList()
  }, [location, navigate])

  // useEffect(() => {
  //   fetchChattedList()
  // }, [])

  const handleUserClick = (userId) => {
    setSelectedUserId(userId)
  }

  const handleStateChange = (event) => {
    const state = event.target.value.toLowerCase()
    if (state) {
      const filteredList = list.filter(
        (lawyer) => lawyer.state.toLowerCase() === state
      )
      setFilteredList(filteredList)
    } else {
      fetchLawyerList()
    }
  }

  return (
    <div className='h-screen flex justify-center items-start lg:py-10'>
      {user && (
        <div className='container border h-full flex items-start border-zinc-200 shadow-2xl mx-auto'>
          {/* Chat List View  */}
          <div
            className={`flex ${
              isFullScreen
                ? 'lg:w-[32%] max-lg:w-full relative'
                : 'lg:w-[5%] max-lg:w-full'
            } bg-zinc-800 ${
              selectedUserId ? 'max-lg:hidden' : 'maxm-md:flex'
            } justify-between items-start transition-all duration-100 h-full`}
          >
            <div className='w-full '>
              <div
                className={`flex ${
                  isFullScreen
                    ? 'p-10 max-lg:p-5 justify-between'
                    : 'py-10 justify-center'
                } pb-5 relative items-center max-lg:border-b border-gray-600 mb-3`}
              >
                <img
                  src={isFullScreen ? LeftArrow : RightArrow}
                  className='w-[25px] max-lg:hidden cursor-pointer'
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  alt=''
                />
                {isFullScreen && (
                  <h1 className='text-3xl text-white font-bold'>Chats</h1>
                )}
                {isFullScreen && (
                  <img
                    src={MenuIcon}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='w-11 cursor-pointer'
                    alt=''
                  />
                )}
                {isMenuOpen && (
                  <div className='absolute border w-[180px] font-semibold bg-black py-5 text-white top-20 right-20'>
                    <Link to={`/profile/${user._id}`}>
                      <p className='px-5 py-2 hover:bg-primary'>Profile</p>
                    </Link>
                    {user.userType === 'guest' && (
                      <p
                        onClick={fetchLawyerList}
                        className='px-5 py-2 cursor-pointer hover:bg-primary'
                      >
                        Lawyer List
                      </p>
                    )}
                    <div className='w-full justify-center flex pt-5'>
                      <Link to={'https://www.solvelitigation.com'}>
                        <SLButton title={'Return to SL'} variant={'primary'} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              {isFullScreen && (
                <div>
                  {isLawyerList && (
                    <div className='px-4 flex gap-5 pb-3'>
                      <select
                        onChange={handleStateChange}
                        name='state'
                        className='p-2 px-5 max-lg:w-full'
                        id='state'
                      >
                        <option value=''>Filter lawyer by state</option>
                        <option value=''>All</option>
                        {StateData.states.map((state, index) => (
                          <option key={index} value={state.state}>
                            {state.state}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {filteredList.map((lawyer) => (
                    <div
                      key={lawyer.id}
                      className={`flex items-center ${
                        lawyer._id === selectedUserId && 'bg-primary'
                      } hover:bg-primary p-4 text-white cursor-pointer`}
                      onClick={() => handleUserClick(lawyer._id)}
                    >
                      <img
                        src={Lawyer}
                        alt={lawyer.name}
                        className='w-16 h-16 rounded-full mr-4'
                      />
                      <div className='w-full'>
                        <h2 className='text-xl font-semibold'>
                          {lawyer.fullName}
                          <span className='font-light text-base'>
                            {' '}
                            | {lawyer.specialty}
                          </span>
                        </h2>
                        <p className='text-gray-200'>Assam | Barpeta</p>
                      </div>
                    </div>
                  ))}
                  {filteredList.length === 0 && (
                    <p className='text-center py-3'>No data found</p>
                  )}
                </div>
              )}
            </div>
            <div className='lg:hidden fixed flex items-center z-30 bottom-0 bg-zinc-900 left-0 right-0'>
              <div
                onClick={() => {
                  setSelectedUserId(null)
                  fetchChattedList()
                  setIsLawyerList(false)
                }}
                className={`flex flex-col justify-center ${
                  !selectedUserId && !isLawyerList && 'bg-primary'
                } p-5 py-6 items-center w-1/3`}
              >
                <p className='text-base font-bold text-white'>Chat</p>
              </div>
              <div
                onClick={fetchLawyerList}
                className={`flex flex-col ${
                  isLawyerList && 'bg-primary'
                } justify-center p-5 py-6 items-center w-1/3`}
              >
                <p className='text-base font-bold text-white'>Lawyers</p>
              </div>
              <Link
                className={`flex flex-col justify-center p-5 py-6 items-center w-1/3`}
                to={`/profile/${user._id}`}
              >
                <div>
                  <p className='text-base font-bold text-white'>Profile</p>
                </div>
              </Link>
            </div>
          </div>
          <div
            className={`${
              isFullScreen
                ? 'lg:w-[68%] max-lg:w-full'
                : 'lg:w-[95%] max-lg:w-full'
            } flex flex-col gap-3 ${
              selectedUserId ? 'max-lg:flex' : 'max-lg:hidden'
            } h-full`}
          >
            {/* Chat View  */}
            {selectedUserId ? (
              <Chat
                userId={selectedUserId}
                onBackClick={() => setSelectedUserId(null)}
              />
            ) : (
              <div className='flex justify-center items-center h-full'>
                <div className='flex justify-center items-center flex-col'>
                  <svg
                    viewBox='0 0 1024 1024'
                    className='icon w-[200px]'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#000000'
                  >
                    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                    <g
                      id='SVGRepo_tracerCarrier'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></g>
                    <g id='SVGRepo_iconCarrier'>
                      <path
                        d='M885.8 383.8h-90.4c12.3 15.8 19.7 35.6 19.7 57.1v194c0 51.3-42 93.2-93.2 93.2H494.1c12.1 31 42.2 53.1 77.4 53.1h314.3c45.6 0 83-37.3 83-83V466.8c-0.1-45.7-37.4-83-83-83z'
                        fill='#0052cc'
                      ></path>
                      <path
                        d='M780.7 582.4V286.3c0-74.2-60.7-134.9-134.9-134.9H198.2c-74.2 0-134.9 60.7-134.9 134.9v296.1c0 70.5 54.8 128.7 123.8 134.4 0 0-20 155.4 4.9 155.4s188.4-154.9 188.4-154.9h265.3c74.3 0 135-60.7 135-134.9z m-424.1 74.9l-17.4 16.4c-0.3 0.3-34.5 32.7-73.2 67.1-8.5 7.5-16.2 14.3-23.3 20.5 1.9-20.9 3.9-36.6 3.9-36.8l8-62.3L192 657c-38.5-3.2-68.7-36-68.7-74.6V286.3c0-19.9 7.8-38.6 22.1-52.8 14.2-14.2 33-22.1 52.8-22.1h447.6c19.9 0 38.6 7.8 52.8 22.1 14.2 14.2 22.1 33 22.1 52.8v296.1c0 19.9-7.8 38.6-22.1 52.8-14.2 14.2-33 22.1-52.8 22.1H356.6z'
                        fill='#0052cc'
                      ></path>
                      <path
                        d='M830.3 337.9c-16.2-3.3-32.1 7.1-35.4 23.3-3.3 16.2 7.1 32.1 23.3 35.4 39 8 67.3 42.7 67.3 82.5v177c0 41.6-31.1 77.5-72.3 83.4l-32.7 4.7 7.8 32.1c2 8.1 3.9 16.8 5.8 25.3-17.6-16.4-37.3-35.2-55.2-52.7l-8.7-8.6H562.5c-21.9 0-36.6-1.4-47.2-8.6-13.7-9.3-32.4-5.8-41.7 7.9-9.3 13.7-5.8 32.4 7.9 41.7 25.7 17.5 55.3 19 81 19h143.2c10 9.7 27.3 26.3 45 42.8 16.2 15.1 29.6 27.1 39.8 35.9 20 17 29.3 23.1 41.6 23.1 9.7 0 18.7-4.4 24.8-12.1 10.1-12.9 10.2-29.1 0.5-78.7-1.4-7.2-2.9-14.2-4.3-20.6 54.4-21.1 92.4-74.3 92.4-134.6v-177c0.1-68-48.4-127.4-115.2-141.2z'
                        fill='#0052cc'
                      ></path>
                      <path
                        d='M434.6 602.8c-35.9 0-71-17.1-98.8-48.1-24.6-27.5-39.3-61.6-39.3-91.4v-29.7l29.7-0.3c0.4 0 36.2-0.4 95.4-0.4 16.6 0 30 13.4 30 30s-13.4 30-30 30c-22.3 0-41.2 0.1-56.2 0.1 3.8 7.1 8.8 14.5 15.1 21.6 16 17.9 35.7 28.1 54.1 28.1s38.1-10.3 54.1-28.1c6.5-7.3 11.6-14.9 15.4-22.2-13.7-2.8-24.1-15-24-29.5 0.1-16.5 13.5-29.9 30-29.9h0.1c27.1 0.1 32.5 0.2 33.6 0.3l28.9 1.1v28.9c0 29.8-14.7 63.9-39.3 91.4-27.9 31-62.9 48.1-98.8 48.1z m107.1-109.5z'
                        fill='#33CC99'
                      ></path>
                    </g>
                  </svg>
                  <p className='italic text-lg'>
                    Please select a user to initiate a conversation
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatList
