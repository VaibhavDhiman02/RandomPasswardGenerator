import { useCallback, useState , useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length , setLength] = useState(8);
  const [numAllowed , setNumAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [passward , setPassward] = useState("");

  const passwardGeneratorFunction = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed){
      str += "0123456789";
    };

    if(charAllowed){
      str += "~`@#$%^&*()_+=-₹[]{};':/.,?><";
    };

    for(let i = 1 ; i <= length ; i++){

      let createPassward = Math.floor(Math.random() * str.length + 1 );
      pass += str.charAt(createPassward);

    }

    setPassward(pass);

  } , [length , numAllowed , charAllowed , setPassward]);

  useEffect(() => {
    passwardGeneratorFunction();
  } , [length , numAllowed , charAllowed , passwardGeneratorFunction])

  const useRefHook = useRef(null);

  const copyToClipBoard = () => {
    window.navigator.clipboard.writeText(passward);
  }

  return (
    <>
        <div className="main-div">
          <h5>Passward Generator</h5>
          <div className="content">
            <div className="display-pass">
              <input type="text"
                    value={passward}
                    className='pass'
                    placeholder='Passward'
                    readOnly
              />
              <button
                className='copybtn'
                onClick={copyToClipBoard}
              >COPY</button>
            </div>
            <div className="check-range">
              <input type="range"
                     min={8}
                     max={100}
                     value={length}
                     className='rangePass'
                     onChange={(e) => {
                      setLength(e.target.value);
                     }}
              />
              <label>
                Length:{length}
              </label>

              <input type="checkbox"
                     defaultChecked={numAllowed}
                     id='numberInput'
                     onChange={() => {
                      setNumAllowed((prev) => !prev )
                     }}
              />
              <label htmlFor='numberInput'>Numbers</label>

              <input type="checkbox"
                     defaultChecked={charAllowed}
                     id='charInput'
                     onChange={() => {
                      setCharAllowed((prev) => !prev )
                     }}
              />
              <label htmlFor='charInput'>Characters</label>

            </div>
          </div>
        </div>
    </>
  )
}

export default App
