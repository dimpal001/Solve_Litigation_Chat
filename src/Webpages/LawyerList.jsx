import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const lawyers = [
  {
    id: 1,
    name: 'John Doe',
    specialty: 'Criminal Law',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Jane Smith',
    specialty: 'Family Law',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Jane Smith',
    specialty: 'Family Law',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Jane Smith',
    specialty: 'Family Law',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Jane Smith',
    specialty: 'Family Law',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    name: 'Jane Smith',
    specialty: 'Family Law',
    avatar: 'https://via.placeholder.com/150',
  },
]

const LawyerList = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const tokenFromParams = queryParams.get('token')
    const userFromParams = queryParams.get('user')

    const tokenFromStorage = localStorage.getItem('token')
    const userFromStorage = localStorage.getItem('user')

    if (!tokenFromStorage || !userFromStorage) {
      if (tokenFromParams && userFromParams) {
        localStorage.setItem('token', tokenFromParams)
        localStorage.setItem('user', userFromParams)
      } else {
        window.location.href = 'http://localhost:5174'
        return
      }
    }
  }, [location])

  const handleClick = (id) => {
    navigate(`/lawyer/${id}`)
  }

  return (
    <div className='container mx-auto py-7 lg:px-[280px]'>
      <h1 className='text-4xl font-bold mb-4'>Lawyers</h1>
      <div className='flex gap-5 flex-col'>
        {lawyers.map((lawyer) => (
          <div
            key={lawyer.id}
            className='flex items-center p-4 bg-white border border-zinc-200 shadow rounded-lg cursor-pointer hover:bg-blue-50'
            onClick={() => handleClick(lawyer.id)}
          >
            <img
              src={lawyer.avatar}
              alt={lawyer.name}
              className='w-16 h-16 rounded-full mr-4'
            />
            <div>
              <h2 className='text-xl font-semibold'>{lawyer.name}</h2>
              <p className='text-gray-600'>{lawyer.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LawyerList
