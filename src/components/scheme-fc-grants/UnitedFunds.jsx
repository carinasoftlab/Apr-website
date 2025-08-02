import React from 'react'
import TiedFundsPagination from '../ui/pagination/TiedFundsPagination'
import BeforeAfterWork from './BeforeAfterWork'
import { UnitedFundsBeforeAfterWorkData } from '@/constants/scheme-fc-grants.data'

const UnitedFunds = () => {
  return (
    <div className="rounded-2xl border p-8 md:p-14 border-[#F4AC1A] bg-gradient-to-t from-prime-bg to-white overflow-hidden space-y-8">
    {/* Card Header */}
    <div className="flex flex-col  sm:justify-between sm:items-start gap-4 ">
      <div className="">
        <h2 className="text-2xl md:text-3xl  font-bold text-prime uppercase tracking-wide ">
          8/2 Leyam Gram Panchayat
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
        <p className="text-black uppercase font-semibold flex items-center">
          District: Kurung Kumey
        </p>
      </div>
    </div>

   

     {/* Dynamic BeforeAfterWork components */}
     {UnitedFundsBeforeAfterWorkData.map((item) => (
       <BeforeAfterWork key={item.id} data={item} />
     ))}


     
  </div>
  )
}

export default UnitedFunds
