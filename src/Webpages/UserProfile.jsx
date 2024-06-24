import { Link, useParams } from 'react-router-dom'
import { SLButton } from '../Components/Customs'
import { useContext, useEffect, useState } from 'react'
import { api } from '../Components/Apis'
import axios from 'axios'
import { UserContext } from '../UserContext'
import ProfilePic from '../assets/profile.svg'
import CallImg from '../assets/call.svg'
import EmailImg from '../assets/email.svg'

const UserProfile = () => {
  const { userId } = useParams()
  const [profileUser, setProfileUser] = useState()
  const { user } = useContext(UserContext)

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
      setProfileUser(response.data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div className='container h-screen flex justify-center items-center mx-auto px-6 md:p-4 lg:px-[280px]'>
      {!profileUser ? (
        <p className='text-3xl italic font-semibold'>Loading profile...</p>
      ) : (
        <div className='bg-white w-full border border-zinc-100 max-md:pt-10 shadow-lg rounded-lg overflow-hidden'>
          <div className='bg-cover bg-center p-4'>
            <div className='flex gap-10 max-md:gap-3 max-md:flex-col items-center p-5'>
              <img
                src={ProfilePic}
                alt={profileUser.name}
                className='rounded-full border-solid border-white border-2 h-52 w-52'
              />
              <div>
                <h2 className='text-2xl font-bold max-md:text-center mb-2'>
                  {profileUser.fullName}
                </h2>
                {profileUser.specialist && (
                  <p className='text-gray-700 mb-2 max-md:text-center'>
                    Speciality : {profileUser.specialist}
                  </p>
                )}
                <p className='text-gray-600 max-md:text-center'>
                  {profileUser.bio}
                </p>
              </div>
            </div>
          </div>
          <div className='px-6 py-4 bg-gray-100'>
            <h3 className='text-lg font-semibold mb-2'>Contact Information</h3>
            <div className='flex gap-5'>
              <div className='flex justify-center items-center gap-2'>
                <img src={EmailImg} className='w-6' alt='' />
                <p className='text-gray-700'>{profileUser.email}</p>
              </div>
              <div className='flex justify-center items-center gap-2'>
                <img src={CallImg} className='w-5' alt='' />
                <p className='text-gray-700'>{profileUser.phoneNumber}</p>
              </div>
            </div>
            <div className='flex justify-center lg:justify-start gap-3 pt-5'>
              <Link to={'/'}>
                <SLButton title={`Return to Chat`} variant={'primary'} />
              </Link>
              {/* {profileUser.userType === 'lawyer' &&
                user._id !== profileUser._id && (
                  <SLButton title={`Report Lawyer`} variant={'secondary'} />
                )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
