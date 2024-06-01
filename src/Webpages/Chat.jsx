import { Link } from 'react-router-dom'
import { SendIcon } from '../Components/Customs'

const Chat = ({ user }) => {
  console.log(user)
  return (
    <div className='container mx-auto lg:pt-5 lg:px-[180px]'>
      <div className='flex border rounded-3xl h-[670px] flex-col'>
        {/* Chat Header */}
        <div className='flex items-center justify-between border-b border-gray-200 p-4'>
          <div className='flex items-center space-x-4'>
            <div>
              <Link to={'/l-profile'}>
                <div className='font-semibold'>Admin</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className='flex-1 p-4 space-y-4 overflow-y-auto'>
          {/* Example message from the admin */}
          <div className='flex flex-col items-start pr-32 gap-1'>
            <div className='bg-gray-200 p-2 rounded-lg'>
              <div className='text-sm'>
                Hello, how can I help you? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Ipsam doloribus ut ad veritatis,
                sequi minus dolorum alias numquam accusamus fugiat
                exercitationem voluptatibus quisquam officia perferendis iste,
                tempore suscipit. Odit alias ad quisquam cumque saepe eum
                placeat tempore qui eaque voluptate, hic perspiciatis odio in
                itaque cum. Deleniti error id odio!
              </div>
            </div>
            <div className='bg-gray-200 p-2 rounded-lg'>
              <div className='text-sm'>
                Hello, how can I help you? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Ipsam doloribus ut ad veritatis,
                sequi minus dolorum alias numquam accusamus fugiat
                exercitationem voluptatibus quisquam officia perferendis iste,
                tempore suscipit. Odit alias ad quisquam cumque saepe eum
                placeat tempore qui eaque voluptate, hic perspiciatis odio in
                itaque cum. Deleniti error id odio!
              </div>
            </div>
          </div>
          {/* Example message from the user */}
          <div className='flex flex-col items-end pl-32 justify-end gap-1'>
            <div className='bg-blue-500 text-white p-2 rounded-lg'>
              <div className='text-sm'>
                I Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                quo ut laudantium, accusamus, nisi impedit doloremque explicabo
                quidem odio aliquid placeat corrupti, tenetur dicta perferendis.
                Ratione laudantium deleniti aliquam doloribus.have a question
                about my order.
              </div>
            </div>
            <div className='bg-blue-500 text-white p-2 rounded-lg'>
              <div className='text-sm'>
                I Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                quo ut laudantium, accusamus, nisi impedit doloremque explicabo
                quidem odio aliquid placeat corrupti, tenetur dicta perferendis.
                Ratione laudantium deleniti aliquam doloribus.have a question
                about my order.
              </div>
            </div>
            <div className='bg-blue-500 text-white p-2 rounded-lg'>
              <div className='text-sm'>
                I Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                quo ut laudantium, accusamus, nisi impedit doloremque explicabo
                quidem odio aliquid placeat corrupti, tenetur dicta perferendis.
                Ratione laudantium deleniti aliquam doloribus.have a question
                about my order.
              </div>
            </div>
            <div className='bg-blue-500 text-white p-2 rounded-lg'>
              <div className='text-sm'>
                I Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                quo ut laudantium, accusamus, nisi impedit doloremque explicabo
                quidem odio aliquid placeat corrupti, tenetur dicta perferendis.
                Ratione laudantium deleniti aliquam doloribus.have a question
                about my order.
              </div>
            </div>
            <div className='bg-blue-500 text-white p-2 rounded-lg'>
              <div className='text-sm'>
                I Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                quo ut laudantium, accusamus, nisi impedit doloremque explicabo
                quidem odio aliquid placeat corrupti, tenetur dicta perferendis.
                Ratione laudantium deleniti aliquam doloribus.have a question
                about my order.
              </div>
            </div>
          </div>
        </div>

        {/* Input Field */}
        <div className='border-t w-full justify-center border-gray-200 p-4 flex items-center space-x-4'>
          <form className='w-full flex justify-center gap-3'>
            <input
              autoFocus
              type='text'
              placeholder='Type a message'
              className='flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
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
