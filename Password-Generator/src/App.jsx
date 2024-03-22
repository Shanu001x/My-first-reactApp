import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false);
  const [charAlllowed, setcharAlllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numberallowed) str+= '01234567890'
    if(charAlllowed) str+= '`!@#$%&*()_+{}":<>?`'

    for(let i=1; i<=length;i++) {
      let char  = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberallowed, charAlllowed,setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password)

  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberallowed, charAlllowed, passwordGenerator])

  return (
    <>
    <div
    className='w-full max-w-md mx-auto shadow-md rounded-lg px-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>PasswordGenerator</h1>
      <div
      className='felx-shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef} />
        <button onClick={copyPasswordToClipBoard}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button> 

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setlength(e.target.value)}} />
          <label> length {length}
          </label>
        </div>
        <div className=' flex item-center gap-x-1'>
          <input type="checkBox"
          defaultChecked = {numberallowed}
          id='numberInput'
          onChange={() => {
            setnumberallowed((prev)  => !prev);
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className=' flex item-center gap-x-1'>
          <input type="checkBox"
          defaultChecked = {charAlllowed}
          id='charInput'
          onChange={() => {
            setcharAlllowed((prev)  => !prev);
          }} />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default App
