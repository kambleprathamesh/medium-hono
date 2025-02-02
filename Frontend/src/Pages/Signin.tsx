import React from 'react'
import { Quotes } from '../components/Quotes'
import { Auth } from '../components/Auth'
import { signin } from '@prathmeshkamble/medium-common'
const Signin = () => {
  return (
    <div className='grid grid-cols-2'>
        <div>SIGNIN </div>
        <div className='hidden md:block'>
        <Quotes/>
        </div>
        
        </div>
  )
}

export default Signin