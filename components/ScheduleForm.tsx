'use client'

import { scheduleAppointment } from "@/actions/server.actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RxCross2 } from "react-icons/rx";



function ScheduleForm({data ,setOpen}:any) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const router = useRouter()

  const sumbitAppointment = async (e:any) => {
    e.preventDefault();

    const userId = data.user.id
    const appointmentId = data.id
    const schedule = startDate
    await scheduleAppointment({ userId , appointmentId , schedule })
     
    router.refresh()
    setOpen(false)
  };
    
  return (
    <div className=' fixed bg-[#00000027] backdrop-blur-[5px w-full flex items-center justify-center  left-0 top-0 h-screen  z-20'>

        <form onSubmit={sumbitAppointment} className=" inshadow footer2 flex-col px-10 flex gap-3 justify-center backdrop-blur-[20px] rounded-lg bg-[#140e1a1d] w-[40%] max-lg:w-[66%] max-md:w-[86%] max-md:h-[55%] h-[70%] ">
        <h1 onClick={()=>setOpen(false)} className=" cursor-pointer text-4xl absolute top-6 right-6 "> <RxCross2 /> </h1>

      <div className=" ">
          <p className=" text-4xl font-semibold logo2">  Schedule Appointment</p>  
          <p className=" mt-2 text-sm text-gray-400">Please fill in the following details to schedule</p>
      </div>

        <div className="">
        <p className=" text-xs text-gray-400">Doctor</p>
            <h1 className=" border-2 w-fit px-5 border-[#ffffff45] inshadow py-2 rounded-lg  ">
            {data?.doctor.name}
            </h1>
        <p className=" text-xs text-gray-400 mt-2">Hospital</p>
            <h1 className=" border-2 w-fit px-5 border-[#ffffff45] inshadow py-2 rounded-lg  ">
            {data?.doctor.hospital.name}
            </h1>
        </div>
          <div>
          <p  className=" text-xs mb-2 text-gray-500 font-semibold " >Expected appointment date</p>
                <DatePicker className=" bg-[#ffffff29] fram rounded-lg inshadow py-2 order-2 pl-4" selected={startDate} showTimeSelect
        dateFormat="Pp" onChange={(date) => setStartDate(date as Date | null)} />
        </div>
        <button className=" inshadow bg-[#24ae7c] rounded-lg p-2 px-4">Sumbit</button>
        </form>
    </div>
  )
}

export default ScheduleForm