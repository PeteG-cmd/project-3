import React from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Spinner = () => {

  return <div className='Loading'>
    <Loader
      type='Puff'
      color='#00BFFF'
      height={100}
      width={100}
      timeout={5000}
    />


  </div>


}



export default Spinner