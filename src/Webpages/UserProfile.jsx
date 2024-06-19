import { Link, useParams } from 'react-router-dom'
import { SLButton } from '../Components/Customs'
import { useEffect, useState } from 'react'
import { api } from '../Components/Apis'
import axios from 'axios'

const UserProfile = () => {
  const { userId } = useParams()
  const [user, setUser] = useState()

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/auth/user-details/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div className='container h-screen flex justify-center items-center mx-auto px-6 md:p-4 lg:px-[280px]'>
      {!user ? (
        <p className='text-3xl italic font-semibold'>Loading profile...</p>
      ) : (
        <div className='bg-white w-full border border-zinc-100 max-md:pt-10 shadow-lg rounded-lg overflow-hidden'>
          <div className='bg-cover bg-center p-4'>
            <div className='flex gap-10 max-md:gap-3 max-md:flex-col items-center p-5'>
              <img
                src={user.avatar}
                alt={user.name}
                className='rounded-full border-solid border-white border-2 h-52 w-52'
              />
              <div>
                <h2 className='text-2xl font-bold max-md:text-center mb-2'>
                  {user.fullName}
                </h2>
                <p className='text-gray-700 mb-2 max-md:text-center'>
                  {user.specialty}
                </p>
                <p className='text-gray-600 max-md:text-center'>{user.bio}</p>
              </div>
            </div>
          </div>
          <div className='px-6 py-4 bg-gray-100 text-center'>
            <h3 className='text-lg font-semibold mb-2'>Contact Information</h3>
            <p className='text-gray-700'>{user.email}</p>
            <p className='text-gray-700'>{user.phoneNumber}</p>
          </div>
          <div className='px-6 py-4 bg-gray-100 max-md:flex-col flex justify-center max-md:gap-2 gap-5'>
            <Link to={`/chat/${userId}`}>
              <SLButton
                className={'max-md:w-full'}
                title={`Chat with ${user.fullName}`}
                variant={'primary'}
              />
            </Link>
            <SLButton title={`Report Lawyer`} variant={'secondary'} />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
