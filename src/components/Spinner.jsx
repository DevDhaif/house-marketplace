import { SpinnerCircular, SpinnerCircularSplit } from 'spinners-react';

function Spinner() {
  return (
    <div className='w-full justify-center items-center flex h-screen'>
    <SpinnerCircularSplit className='w-full' size={100} />
    </div>
  )
}

export default Spinner