"use client";
import React, { useEffect, useState } from 'react'


const Page = () => {
    const [ myVar, setMyVar] = useState<number>(0);
    const handleClick = () => {
        setMyVar(prevMyVar => prevMyVar + 1)
    };
  return (
    <div>
        Here is the leaderboard! <br />
        {myVar}
        <button onClick={handleClick}>Click Me</button>
    </div>
  )
}

export default Page
