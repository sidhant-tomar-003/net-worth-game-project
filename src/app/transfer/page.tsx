// import ProductCard from '@/components/productCard'
"use client";
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import ProductCard from './../../components/productCard'
import React from 'react'


function page() {
  const {  isAuthenticated } = useDynamicContext();
  return (
    <div className="bg-gradient-to-r from-black to-blue-900 min-h-screen flex items-center justify-center">
      
      {(isAuthenticated) ? <ProductCard /> : <p>Please Authenticate</p>}
    </div>
  )
}

export default page
