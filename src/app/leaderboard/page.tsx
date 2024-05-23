"use client";
import Leaderboard from '@/components/Leaderboard';
import React, { useEffect, useState } from 'react'

// TODO: Put some rate limiters on how quick the user can switch pages. Otherwise async causes bugs
// TODO: A loader will really look nice
const Page = () => {
    const [ myVar, setMyVar] = useState<number>(0);
    const handleClick = () => {
        setMyVar(prevMyVar => prevMyVar + 1)
    };
  return (
    <div>
        Here is the leaderboard! <br />
        <Leaderboard />
    </div>
  )
}

export default Page
