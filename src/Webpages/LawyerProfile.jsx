import { Link } from 'react-router-dom'
import { SLButton } from '../Components/Customs'

const LawyerProfile = ({ lawyer }) => {
  return (
    <div className='container h-screen flex items-center mx-auto p-4 lg:px-[280px]'>
      <div className='bg-white border border-zinc-100 shadow-lg rounded-lg overflow-hidden'>
        <div className='bg-cover bg-center p-4'>
          <div className='flex gap-10 items-center p-5'>
            <img
              src={lawyer.avatar}
              alt={lawyer.name}
              className='rounded-full border-solid border-white border-2 h-52 w-52'
            />
            <div>
              <h2 className='text-2xl font-bold mb-2'>{lawyer.name}</h2>
              <p className='text-gray-700 mb-2'>{lawyer.specialty}</p>
              <p className='text-gray-600'>{lawyer.bio}</p>
            </div>
          </div>
        </div>
        <div className='px-6 py-4 bg-gray-100 text-center'>
          <h3 className='text-lg font-semibold mb-2'>Contact Information</h3>
          <p className='text-gray-700'>{lawyer.email}</p>
          <p className='text-gray-700'>{lawyer.phone}</p>
        </div>
        <div className='px-6 py-4 bg-gray-100 flex justify-center gap-5'>
          <Link to={'/lawyer/1'}>
            <SLButton title={`Chat with ${lawyer.name}`} variant={'primary'} />
          </Link>
          <SLButton title={`Report Lawyer`} variant={'secondary'} />
        </div>
      </div>
    </div>
  )
}

export default LawyerProfile
