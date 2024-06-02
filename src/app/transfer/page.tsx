import ProductCard from '@/components/productCard'
import React from 'react'

function page() {
  return (
    <div className="bg-gradient-to-r from-black to-blue-900 min-h-screen flex items-center justify-center">
      {<ProductCard />
      /* product ={{
        image: "favicon.ico",
        name: "Hmmium",
        price: 19
      }} */}
    </div>
  )
}

export default page
