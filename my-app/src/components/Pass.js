import React, {useState, useCallback, useEffect, useRef} from 'react'

export default function Pass() {
    const[length, setLength] = useState(8);
    const[numAllowed, setNumAllowed] = useState(false);
    const[charAllowed, setCharAllowed] = useState(false);
    const[password, setPassword]= useState("");
    const passwordRef = useRef(null);

    const copyPassword= useCallback(()=>{
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0, 19);
       window.navigator.clipboard.writeText(password);
    },[password])

     const passwordGenerator= useCallback(()=>{
        let pass= '';
        let str= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        
        if(numAllowed) str+= '0123456789';
        if(charAllowed) str+= '!@#$%^&*(){}~?';
        
        for(let i=1 ; i<=length; i++){
              let char = Math.floor(Math.random() * str.length + 1);
              pass += str.charAt(char);
        }
        setPassword(pass);
     },[length, numAllowed, charAllowed, setPassword])

     useEffect(()=>{
        passwordGenerator()
     },[length,numAllowed,charAllowed,passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg text-orange-500 bg-slate-700 px-4 my-8'>
    <h1 className='text-white text-center py-3 '>Password Generator</h1>
        <div className='flex overflow-hidden shadow rounded-lg mb-4'>
        
         <input
         type='text'
         value={password}
         placeholder='Password'
         className='outline-none px-3 py-1 w-full'
         readOnly
         ref={passwordRef}
         ></input>
         <button className='bg-blue-700 text-white shrink-0 outline-none px-3 py-2 hover:bg-blue-600' onClick={copyPassword}>copy</button>
        </div>
<div className='flex text-sm gap-x-2 py-2'>
    <div className='flex items-center gap-x-1'>
    <input
    type='range'
    min='6'
    max='20'
    value={length}
    className='cursor-pointer'
    onChange={(e)=>{setLength(e.target.value)}}
    >
    </input>
    <labe>Length: {length}</labe>

    </div>

    <div className='flex items-center gap-x-1'>
    <input
    type='checkbox'
    defaultChecked={numAllowed}
    id='numberInput'
    className='cursor-pointer'
    onChange={()=>{setNumAllowed((prev) => !prev)}}
    >
    </input>
    <label htmlFor='numberInput'>Numbers: </label>

    </div>
     
    <div className='flex items-center gap-x-1'>
    <input
    type='checkbox'
    defaultChecked={charAllowed}
    id='charInput'
    className='cursor-pointer'
    onChange={()=>{setCharAllowed((prev) => !prev)}}
    >
    </input>
    <label htmlFor='charInput'>Characters: </label>

    </div>

</div>

    </div>
    </>
  )
}
