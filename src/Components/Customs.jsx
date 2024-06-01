export const SendIcon = () => {
  return (
    <svg
      className='w-8 cursor-pointer'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <path
          d='M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z'
          stroke='#0052cc'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>{' '}
      </g>
    </svg>
  )
}

export const SLButton = ({
  title,
  variant,
  isLoading,
  iconColor,
  isDisabled,
  onClick,
  width,
  className,
  icon,
  loadingText,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 ${
        isDisabled && 'bg-blue-400 cursor-not-allowed hover:bg-blue-400'
      } ${width && `w-full`} py-2 ${className}
        ${variant === 'primary' && 'bg-primary hover:bg-secondary text-white'}
        ${variant === 'secondary' && 'bg-gray-300 hover:bg-gray-400 text-black'}
        ${
          variant === 'success' && 'bg-success hover:bg-successHover text-white'
        }
        ${variant === 'error' && 'bg-error hover:bg-errorHover text-white'}
        flex justify-center items-center gap-2 rounded-sm`}
    >
      {icon && icon}
      {isLoading === true ? <SLSpinner iconColor={iconColor} /> : title}{' '}
      {isLoading && loadingText && loadingText}
    </button>
  )
}

export const SLSpinner = ({ className, iconColor, width }) => {
  return (
    <svg
      className={`${className}`}
      xmlns='http://www.w3.org/2000/svg'
      width={width ? width : '1em'}
      viewBox='0 0 24 24'
    >
      <g stroke={iconColor ? iconColor : '#0052cc'}>
        <circle
          cx='12'
          cy='12'
          r='9.5'
          fill='none'
          strokeLinecap='round'
          strokeWidth='3'
        >
          <animate
            attributeName='stroke-dasharray'
            calcMode='spline'
            dur='1.5s'
            keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1'
            keyTimes='0;0.475;0.95;1'
            repeatCount='indefinite'
            values='0 150;42 150;42 150;42 150'
          />
          <animate
            attributeName='stroke-dashoffset'
            calcMode='spline'
            dur='1.5s'
            keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1'
            keyTimes='0;0.475;0.95;1'
            repeatCount='indefinite'
            values='0;-16;-59;-59'
          />
        </circle>
        <animateTransform
          attributeName='transform'
          dur='2s'
          repeatCount='indefinite'
          type='rotate'
          values='0 12 12;360 12 12'
        />
      </g>
    </svg>
  )
}
