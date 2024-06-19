import { useEffect, useState, useContext, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import io from 'socket.io-client'
import axios from 'axios'
import { SendIcon } from '../Components/Customs'
import { api } from '../Components/Apis'
import { UserContext } from '../UserContext'
import UserImg from '../assets/user.svg'

const Chat = () => {
  const { userId } = useParams()
  const [message, setMessage] = useState('')
  const [toUser, setToUser] = useState('')
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)
  const [attachment, setAttachment] = useState(null)
  const [attachmentName, setAttachmentName] = useState('')
  const [deleteMenuOpen, setDeleteMenuOpen] = useState(null) // State to track which message's delete menu is open
  const { user } = useContext(UserContext)

  const messagesEndRef = useRef(null)

  // Use this function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // const newSocket = io('http://localhost:3000', {
    const newSocket = io('https://api.solvelitigation.com', {
      query: { userId: user._id },
    })
    newSocket.emit('register', user._id)
    setSocket(newSocket)

    if (user) {
      fetchMessages(userId)
    }

    newSocket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
      scrollToBottom()
    })

    return () => {
      newSocket.disconnect()
    }
  }, [userId, user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchMessages = async (recipientId) => {
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
    if (!message.trim() && !attachment) {
      return
    }

    try {
      const formData = new FormData()
      formData.append('from', user._id)
      formData.append('to', userId)
      formData.append('text', message)
      if (attachment) {
        formData.append('attachment', attachment)
      }

      const newMessage = {
        from: user._id,
        to: userId,
        text: message,
        attachment: attachmentName,
        createdAt: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, newMessage])
      scrollToBottom()
      setMessage('')
      setAttachment(null)
      setAttachmentName('')

      if (socket) {
        socket.emit('sendAttachment', {
          formData,
        })
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAttachment(file)
      setAttachmentName(file.name)
    }
  }

  const handleRemoveAttachment = () => {
    setAttachment(null)
    setAttachmentName('')
  }

  const toggleDeleteMenu = (index) => {
    setDeleteMenuOpen(deleteMenuOpen === index ? null : index)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(
        `${api}/api/solve_litigation/message/delete-message/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      setMessages(messages.filter((msg) => msg._id !== messageId))
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  return (
    <div className='container mx-auto lg:pt-5 lg:px-[180px]'>
      <div className='flex border md:rounded-3xl h-[670px] flex-col'>
        {/* Chat Header */}
        <div className='flex items-center justify-between border-b border-gray-200 p-4'>
          <div className='flex items-center space-x-4'>
            <div>
              <Link to={`/profile/${userId}`}>
                <div className='flex group items-center gap-2'>
                  <img src={UserImg} className='w-[40px]' alt='User Avatar' />
                  <div className='font-semibold group-hover:text-primary group-hover:underline'>
                    <p>{toUser.fullName} </p>
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
          <p className='text-gray-500 italic text-center'>
            {messages.length === 0 && `Start messaging with ${toUser.fullName}`}
          </p>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex relative ${
                msg.from === user._id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={
                  msg.from === user._id
                    ? 'bg-blue-500 text-white p-2 rounded-se-none rounded-lg'
                    : 'bg-gray-200 p-2 rounded-lg rounded-ss-none'
                }
                style={{ maxWidth: '92%', wordWrap: 'break-word' }}
                onMouseEnter={() => toggleDeleteMenu(index)}
                onMouseLeave={() => toggleDeleteMenu(null)}
              >
                <div className='text-sm'>{msg.text}</div>
                {msg.attachment && (
                  <div className='bg-blue-900 text-white rounded-se-none rounded-lg p-2'>
                    <strong>Attachment:</strong>{' '}
                    <a
                      href={`${api}/api/solve_litigation/message/download/${msg.attachment}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {msg.attachment}
                    </a>
                  </div>
                )}
                {deleteMenuOpen === index && msg.from === user._id && (
                  <div className='absolute top-0 right-0 bg-white border rounded shadow-md px-2'>
                    <button
                      onClick={() => handleDeleteMessage(msg._id)}
                      className='text-red-500'
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field */}
        {attachment && (
          <div className='flex bg-gray-200 min-w-[50px] px-4 py-2 items-center space-x-2'>
            <span className='bg-blue-500 p-2 rounded-lg'>{attachmentName}</span>
            <button
              type='button'
              onClick={handleRemoveAttachment}
              className='text-red-500'
            >
              X
            </button>
          </div>
        )}
        <div className='border-t w-full justify-center border-gray-200 p-4 flex items-center space-x-4'>
          <form
            className='w-full flex justify-center gap-3'
            onSubmit={sendMessage}
          >
            <div className='flex justify-center items-center'>
              <label htmlFor='fileInput'>
                <svg
                  fill='#000000'
                  viewBox='0 0 24 24'
                  id='attachment-2'
                  data-name='Flat Line'
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon flat-line cursor-pointer h-9 max-md:h-7'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    <path
                      id='primary'
                      style={{
                        fill: 'none',
                        stroke: '#0052cc',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 2,
                      }}
                      d='M6,10v5a6,6,0,0,0,6,6h0a6,6,0,0,0,6-6V7a4,4,0,0,0-4-4h0a4,4,0,0,0-4,4v8a2,2,0,0,0,2,2h0a2,2,0,0,0,2-2V7'
                    ></path>
                  </g>
                </svg>
              </label>
            </div>
            <textarea
              autoFocus
              placeholder='Enter message...'
              rows={1}
              className='w-full bg-blue-100 p-3 focus:outline-none px-5 rounded-2xl'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <input
              id='fileInput'
              type='file'
              className='hidden'
              onChange={handleFileChange}
            />
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
