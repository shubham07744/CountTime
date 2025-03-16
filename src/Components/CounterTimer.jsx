import React, { useEffect, useRef, useState } from 'react'
import './CounterTimer.css'

const CounterTimer = () => {
    
    const[time, setTime]=useState(0)
    const[isActive, setActive] = useState(false);
    const[isPause, setIsPause] = useState(false);
    const intervalRef = useRef(null)

    const handleInput=(e)=>{
        setTime(parseInt(e.target.value * 60))
    }

    const formatTime=()=>{
        const minutes = String(Math.floor(time / 60)).padStart(2,'0');
        const seconds = String(time % 60).padStart(2,'0')
        return `${minutes}:${seconds}`
    }
    
    const handleStart=()=>{
        setActive(true)
        setIsPause(false)
    }

    const handlePause = ()=>{
        setIsPause(!isPause)
    }

    const handleReset=()=>{
        clearInterval(intervalRef.current)
        isActive(false);
        setIsPause(false);
        setTime(0)
    }

    useEffect(()=>{
        if(isActive && !isPause && time > 0){
            intervalRef.current = setInterval(() => {
                setTime((prev)=> prev-1)
            }, 1000);
        }else if(time === 0){
            clearInterval(intervalRef.current)
            setActive(false)
            // alert('Time is up')
        }
        return ()=> clearInterval(intervalRef.current)
    },[isActive, isPause, time])

  return (
    <div className='countdown-timer'>
        <h1>Countdown Timer</h1>
        <div className='timer-display'>
            <input type="number" placeholder='Enter Time In Minutes' onChange={handleInput} />
            <div>{formatTime()}</div>
        </div>
        <div className='timer-controls'>
            <button onClick={handleStart} disabled={isActive && !isPause}>Start</button>
            <button onClick={handlePause}  disabled={!isActive}>{isPause ? 'Resume' : 'Pause'}</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    </div>
  )
}

export default CounterTimer