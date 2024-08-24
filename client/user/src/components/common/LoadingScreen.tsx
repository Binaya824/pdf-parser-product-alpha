import React from 'react'
import UseAnimations from 'react-useanimations';
import loading2 from 'react-useanimations/lib/loading2';

const LoadingScreen = () => {
  return (
    <div className='fixed top-0 left-0 h-screen w-full bg-white flex justify-center items-center' >
        <UseAnimations style={{backgroundColor:"red"}} fillColor='red' autoplay={true} loop={true} animation={loading2} size={56} />
    </div>
  )
}

export default LoadingScreen