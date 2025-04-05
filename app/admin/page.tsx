import { Allappointments } from "@/actions/server.actions";
import AdminTabel from "@/components/AdminTabel";
import prisma from "@/lib/prisma"; 
import { GoHourglass } from "react-icons/go";
import { IoIosWarning } from "react-icons/io"; 
import { TbCalendarCheck } from "react-icons/tb";
import { createClerkClient } from '@clerk/nextjs/server'
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

async function AdminPage({searchParams}:{searchParams:{[key:string]:string|undefined};}) {
  const {page} = searchParams;
  const p = page ?parseInt(page): 1;
  const appointments = await Allappointments(p);
  const users = appointments?.users || [];
  const totalAppointments = appointments?.totalAppointments || 0;
  
  const [ pending , scheduled , cancelled ] = await prisma.$transaction([
        
    prisma.appointment.count({
      where:{
        status:'pending'
      },
    }),
    prisma.appointment.count({
      where:{
        status:'Scheduled'
      },
    }),
    prisma.appointment.count({
      where:{
        status:'Cancelled'
      },
    })
  ])
  return (
    <>
      <h1 className="text-4xl logo2 font-bold">Welcome, Admin</h1>

      <div className="w-full flex max-md:flex-col max-lg:gap-3 justify-around mt-4">
        <div className="w-96 overflow-hidden relative frame footer2 border- shadow-xl shadow-[black] border-[#9e9e9e1f] max-md:w-full max-md:h-32 font-semibold flex flex-col justify-center pl-6 gap-5 bg-[#2d2b38] rounded-xl h-36">
          <div className="flex  items-center gap-4 max-lg:text-3xl text-4xl text-green-500">
          <div className=" absolute bg-[#2aff3535] h-12 w-20 blur-lg "></div>

            <TbCalendarCheck /> <span>{scheduled}</span>
          </div>
          <p>Total number of scheduled appointments</p>
        </div>
        <div className="w-96 overflow-hidden frame footer2 border- shadow-xl shadow-[black] border-[#9e9e9e1f] max-md:w-full max-md:h-32 font-semibold flex flex-col justify-center pl-6 gap-5 bg-[#2d2b38] rounded-xl h-36">
          <div className="flex items-center gap-4 max-lg:text-3xl text-4xl text-blue-500">
          <div className=" absolute bg-[#2ec7f634]  h-12 w-20 blur-lg "></div>

          <GoHourglass />
          <span>{pending}</span>
          </div>
          <p>Total number of pending appointments</p>
        </div>
        <div className="w-96 overflow-hidden frame footer2 border- shadow-xl shadow-[black] border-[#9e9e9e1f] max-md:w-full max-md:h-32 font-semibold flex flex-col justify-center pl-6 gap-5 bg-[#2d2b38] rounded-xl h-36">
          <div className="flex items-center gap-4 max-lg:text-3xl text-4xl text-red-600 ">
            <div className=" absolute bg-[#f62e2e46]  h-12 w-20 blur-lg "></div>
            <IoIosWarning className=" z-10 " /> <span>{cancelled}</span>
          </div>
          <p>Total number of cancelled appointments</p>
        </div>
      </div> 
      <AdminTabel users={users}  page={p} count={totalAppointments} />
    </>
  );
}

export default AdminPage;
