import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }


    }, [])

    const ShowPassword = () => {
        // alert("Password is visible")
        passwordref.current.type = "text"
        if (ref.current.src.includes("/icons/eye.png")) {
            ref.current.src = "/icons/eyecross.png"
            passwordref.current.type = "text"
        } else {
            ref.current.src = "/icons/eye.png"
            passwordref.current.type = "password"
        }
    }

    const savePassword = () => {
        
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newpassword = {...form, id: uuidv4()}

            console.log("passwprd saved")
            setpasswordArray([...passwordArray,newpassword])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, newpassword]))
            console.log(passwordArray)
            toast.success('Password saved successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                
            });
       
        } else {
            toast("Error,password is not saved");
        }
   

    }

    const editPassword = (id) => {
        console.log("editing the password with id", id)
        setform(passwordArray.filter(item => item.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const deletePassword = (id) => {
        let cf = confirm("Are you sure you want to delete this data?")
        if (cf) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
        toast.success('Password Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
    }



    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value})
    }

    const copytext = (text) => {
        toast.success('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text);
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />

            <div><div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)] h-16"></div>
            </div>
                <div className=''>

                    <div className='px-50 m-2 my-10 flex flex-col items-center'>
                        <h1 className='font-bold text-black text-2xl'>
                            <span className='text-purple-500'>&lt;</span>SAAS-PrOD / <span className='text-blue-500'>&gt;</span></h1>
                        <p>Manage your password</p>
                        <div className='flex flex-col items-center w-full'>
                            <input placeholder='Enter Website URL' value={form.site} onChange={handlechange} className='bg-gray-100 px-2 py-1 border border-purple-300 text-black my-6  w-4/5 rounded-full' name='site' type="text" />
                            <div className='flex gap-6 items-center justify-between w-4/5 '>
                                <input placeholder='Enter Username' value={form.username} onChange={handlechange} className='bg-gray-100 px-2 py-1 border border-purple-300 text-black w-4/5  rounded-full' name='username' type="text" />
                                <div className='relative'>
                                    <input placeholder='Enter Password' value={form.password} onChange={handlechange} className='bg-gray-100 px-2 py-1 border border-purple-300 text-black  rounded-full' ref={passwordref} name='password' type="password" /> <span className='absolute right-2 top-1 cursor-pointer ' onClick={ShowPassword}><img width={25} ref={ref} src="./icons/eye.png" alt="" /></span>
                                </div>
                            </div>
                        </div>

                        <button onClick={savePassword} className='bg-purple-200 w-fit flex my-7 cursor-pointer rounded-full p-2 px-4 hover:font-bold'>Save Password</button>
                    </div>
                    <div className="passwords  px-50">
                        <h2 className='my-4 font-bold text-2xl'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div className='text-center text-xl bg-purple-100 mx-90 rounded-full p-3'>No Passwords to show</div>}
                        {passwordArray.length != 0 && <table className="table-auto w-full border border-black rounded-md overflow-hidden mb-10">
                            <thead className='bg-gray-300'>
                                <tr >
                                    <th className='w-12 py-2 border border-white'>Site</th>
                                    <th className='w-12 py-2 border border-white'>Username</th>
                                    <th className='w-12 py-2 border border-white'>Password</th>
                                    <th className='w-12 py-2 border border-white'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-purple-200'>

                                {passwordArray.map((item, index) => {

                                    return (
                                        <tr key={index}>
                                            <td className='w-23 py-2 border border-white text-center '>
                                                <div className='flex  items-center justify-center '>
                                                    <a href={item.site} target='_blank'>{item.site}</a>
                                                    <button className='cursor-pointer px-3 py-1' onClick={() => copytext(item.site)}><img src="/icons/copy.png" width={18} alt="copy" /></button>
                                                </div>
                                            </td>
                                            <td className='w-23 py-2 border border-white text-center'>
                                                <div className='flex  items-center justify-center '>
                                                    {item.username}
                                                    <button className='cursor-pointer px-3 py-1' onClick={() => copytext(item.username)}><img src="/icons/copy.png" width={18} alt="copy" /></button>
                                                </div>
                                            </td>

                                            <td className='w-23 py-2 border border-white text-center'>
                                                <div className='flex  items-center justify-center '>
                                                    {item.password}
                                                    <button className='cursor-pointer px-3 py-1' onClick={() => copytext(item.password)}><img src="/icons/copy.png" width={18} alt="copy" /></button>
                                                </div>
                                            </td>

                                            <td className='w-full py-3 border border-white text-center flex justify-center gap-9 items-center'>
                                                <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}><img width={18} src="/icons/pencil.png" alt="" /></span>
                                                <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}><img width={18} src="/icons/bin.png" alt="" /></span>
                                            </td>
                                        </tr>
                                    )

                                })}

                            </tbody>
                        </table>}
                    </div>
                </div >


            </div>


        </>
    )
}

export default Manager
