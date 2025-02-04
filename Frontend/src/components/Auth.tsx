import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, MouseEvent, useState } from "react"
import { signin, signupInput } from "@prathmeshkamble/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { toast } from "react-hot-toast"
export const Auth = ({ type }: { type: "SignUp" | "SignIn" }) => {

    const [postInputs, setPostInputs] = useState<signupInput>({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    // @ts-ignore
    const [loading, setLodaing] = useState(false);


    const sendrequest = async () => {
        setLodaing(true);
        const toastId = toast.loading(type === 'SignUp' ? 'Signing up...' : 'Signing in...');

        try {
            console.log(BACKEND_URL);
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/auth/${type == 'SignUp' ? "signup" : "signin"}`, { postInputs })

            console.log(response.status);
            const jwt = response.data;
            console.log("jwt", jwt.jwt);

            localStorage.setItem("token", jwt.jwt);
            if (response.data.message === "User already exists") {
                toast.error("User already exists. Please try logging in.");
            } else {
                toast.success(response.data.message)
            }
            if (type == "SignIn")
                navigate("/blogs");


            setLodaing(false);

        } catch (error) {
            console.log(error)
            toast.error(type == 'SignUp' ? "SignUp Falied" : "Login Falied")
            setLodaing(false);
        }
        toast.dismiss(toastId);
    }
    return (
        <div className="h-screen flex justify-center items-center ">
            <div className="h-auto  max-w-lg flex flex-col justify-center items-center mx-auto    p-8">
                <div className="max-w-xl mb-5  ">
                    <p className="text-3xl font-bold text-black">{type == "SignUp" ? "Create an Account" : "LOGIN"}</p>
                    <p className="text-md font-medium text-gray-400">{type == "SignUp" ? "Already have an Account?" : "Dont Have an Account?"} <Link className="pl-2 underline" to={type == "SignUp" ? "/signin" : "/signup"}>{type == 'SignUp' ? "Login" : "SignUp"}</Link></p>
                </div>
                <div className="max-w-xl  flex flex-col gap-2 " >
                    {type == 'SignUp' ? <LableInputs lable="Name" placeholder="Username" onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })} /> : null}
                    <LableInputs lable="UserName" placeholder="EX:email@gmail.com" onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })} />
                    <LableInputs lable="Password" type={'password'} placeholder="********" onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })} />
                    <SubmitButton label={type} onclick={sendrequest} />
                </div>
            </div>
        </div>
    )
}




interface inputTypes {
    lable: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LableInputs({ lable, placeholder, onChange, type }: inputTypes) {
    return (
        <div className="w-[20rem] ">
            <label className="block text-md font-medium text-gray-900 mb-2 ">{lable}</label>
            <input onChange={onChange} type={type || "text"} id={lable} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ml-1" placeholder={placeholder} required />
        </div>
    )
}


function SubmitButton({ label, onclick }: { label: string, onclick: (e: MouseEvent<HTMLButtonElement>) => void }) {
    return (
        <button onClick={onclick} type="button" className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-white rounded-lg border border-gray-200   focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800   mt-2 ml-1">{label == "SignUp" ? "SignUp" : "SignIn"}</button>
    )
}