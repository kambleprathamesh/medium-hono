import { Link } from "react-router-dom"
import { ChangeEvent,MouseEvent, useState } from "react"
import { signupInput } from "@prathmeshkamble/medium-common"
export const Auth=()=>{

    const [postInputs,setPostInputs]=useState<signupInput>({
        name:"",
        email:"",
        password:""
    })
    return(
     <div> 
        <div className="h-screen max-w-lg flex flex-col justify-center items-center mx-auto  ">
              <div className="max-w-xl mb-5">
                <p className="text-3xl font-bold text-black">Create an Account</p>
                <p className="text-md font-medium text-gray-400">Already have an Account? <Link className="pl-2 underline" to={"/signin"}>Login</Link></p>
             </div>
            <div className="max-w-xl  flex flex-col gap-2 ml-16" >
               <LableInputs  lable="Name" placeholder="Username" onChange={(e)=>setPostInputs({...postInputs,name:e.target.value})}/>
               <LableInputs  lable="UserName" placeholder="EX:email@gmail.com" onChange={(e)=>setPostInputs({...postInputs,email:e.target.value})}/>
               <LableInputs  lable="Password" type={'password'} placeholder="********" onChange={(e)=>setPostInputs({...postInputs,password:e.target.value})}/>
               <SubmitButton label='SignUp'  />
            </div>
        </div>
    </div>
    )
}




interface inputTypes{
    lable:string,
    placeholder:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    type?:string
}

function LableInputs({lable,placeholder,onChange,type}:inputTypes){
    return(
        <div className="w-[20rem] ">
            <label className="block text-md font-medium text-gray-900 mb-2 ">{lable}</label>
            <input  onChange={onChange} type={type||"text"} id={lable} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ml-1" placeholder={placeholder} required />
        </div>
    )
}


function SubmitButton({label,}:{label:string}){
    return(
        <button type="button"className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400  dark:hover:text-white dark:hover:bg-gray-700 mt-2 ml-1">{label}</button>
    )
}