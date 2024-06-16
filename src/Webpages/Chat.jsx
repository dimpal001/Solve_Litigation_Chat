import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import io from 'socket.io-client'
import axios from 'axios'
import { SendIcon } from '../Components/Customs'
import { api } from '../Components/Apis'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import UserImg from '../assets/user.svg'

const Chat = () => {
  const { userId } = useParams()
  const [message, setMessage] = useState('')
  const [toUser, setToUser] = useState('')
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const newSocket = io('https://api.solvelitigation.com', {
      query: { userId: user._id },
    })
    setSocket(newSocket)

    if (user) {
      fetchMessages(userId)
    }

    newSocket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => newSocket.close()
  }, [userId])

  const fetchMessages = async (recipientId) => {
    console.log('the function is calling...')
    console.log(user)
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/message/${user._id}/${recipientId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      setMessages(response.data.messages)
      setToUser(response.data.user)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message.trim() && socket) {
      try {
        await axios.post(
          `${api}/api/solve_litigation/message/send-message`,
          {
            from: user._id,
            to: userId,
            text: message,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        )

        // Update local messages immediately after sending
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message, from: user._id },
        ])
        setMessage('')
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  if (!user) {
    return <div>Loading...</div> // Render loading state until user is fetched
  }

  return (
    <div className='container mx-auto lg:pt-5 lg:px-[180px]'>
      <div className='flex border md:rounded-3xl h-[670px] flex-col'>
        {/* Chat Header */}
        <div className='flex items-center justify-between border-b border-gray-200 p-4'>
          <div className='flex items-center space-x-4'>
            <div>
              <Link to={'/l-profile'}>
                <div className='flex group items-center gap-2'>
                  <img src={UserImg} className='w-[40px]' alt='User Avatar' />
                  <div className='font-semibold group-hover:text-primary group-hover:underline'>
                    <p className=''>{toUser.fullName} </p>
                    <p className='text-sm font-light'>
                      {toUser.speciality} Civil Lawyer
                    </p>
                    {/* Display user name or any identifier */}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className='flex-1 p-4 space-y-1 overflow-y-auto'>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.from === user._id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={
                  msg.from === user._id
                    ? 'bg-blue-500 text-white p-2 rounded-se-none rounded-lg'
                    : 'bg-gray-200 p-2 rounded-lg rounded-ss-none'
                }
                style={{ maxWidth: '92%', wordWrap: 'break-word' }} // Adjust the maximum width as needed
              >
                <div className='text-sm'>{msg.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className='border-t w-full justify-center border-gray-200 p-4 flex items-center space-x-4'>
          <form
            className='w-full flex justify-center gap-3'
            onSubmit={sendMessage}
          >
            <textarea
              autoFocus
              placeholder='Enter message...'
              rows={1}
              className='w-full bg-blue-100 p-3 focus:outline-none px-5 rounded-2xl'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button type='submit'>
              <SendIcon className='h-6 w-6 text-gray-500 rotate-90 cursor-pointer' />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
