// import React from 'react'
import { Auth } from "../components/Auth";
import { Quotes } from "../components/Quotes";
const Signup = () => {
  return <>
    <div className='grid grid-cols-1 lg:grid-cols-2'>

      <div><Auth type="SignUp" /> </div>
      <div className='hidden md:block'>
        <Quotes />
      </div>
    </div>
  </>;
};

export default Signup;
