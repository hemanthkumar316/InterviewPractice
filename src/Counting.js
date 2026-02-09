import React, { useEffect, useState } from 'react'

const App = () => {
  const [count,setCount]=useState(0)
  const [counting,setCounting]=useState(false)
  const handleStart=()=>{
setCount(count+1)
setCounting(true)
  }
  const handleReset=()=>{
setCount(0)
setCounting(false)
  }
  const handleStop=()=>{
    setCounting(false)
  }
  useEffect(()=>{
    let timer;
    if(counting){
    timer=setTimeout(handleStart,100)
    }
    return()=>{
      clearTimeout(timer)
    }
  },[count,counting])
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default App
