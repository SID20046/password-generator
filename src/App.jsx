import { useCallback, useState,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_:?/`~"

    for (let i = 1; i <=length; i++) {
      let c = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(c)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password)
  },[password])

  const [buttonColor,setButtonColor] = useState("blue")

  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator])
  
const chngebtncolor=()=>{
  setButtonColor(prevColor => (prevColor === "blue" ? "deepblue" : "blue"))
}



  return (
    <>
      <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button buttonColor className='outline-none  text-white cursor-pointer rounded-md px-3 py-0.5 shrink-0'
          onClick={() => {copyPasswordToClipboard();chngebtncolor();}}>COPY</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length:{length}</label>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setnumberAllowed((prev) => !prev)
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setcharAllowed((prev) => !prev)
                }}
              />
              <label htmlFor="charInput">charAllowed</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
