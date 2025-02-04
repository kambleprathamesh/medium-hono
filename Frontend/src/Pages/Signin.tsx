// import React from 'react'
import { Auth } from "../components/Auth";
import { Quotes } from "../components/Quotes";
const Signin = () => {
  return <>
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div><Auth type="SignIn" /> </div>
      <div className='hidden lg:block'>
        <Quotes />
      </div>
    </div>
  </>;
};

export default Signin;
