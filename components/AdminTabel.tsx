
"use client";
import React, { useState } from "react"; 
import ScheduleForm from "./ScheduleForm";
import Cancelform from "./Cancelform";
import { GoHourglass } from "react-icons/go";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoIosTimer } from "react-icons/io";
import Pagination from "./Pagenation";
import { useUser } from "@clerk/nextjs";
 
interface userProps {
  totalAppointments?: number;
  users: any;
  count:any,
  page:any
}

function AdminTabel({ users ,count ,page }: userProps) { 
  const [openScheduleId, setOpenScheduleId] = useState<string | null>(null);
  const [openCancelId, setOpenCancelId] = useState<string | null>(null);

  const { user } = useUser();
  const role = user?.publicMetadata?.role; 
    return (
      <>
      <div className="w-full flex flex-col mt-10 mb-10 gap-3 relative rounded-xl border-t-2 border-x-2 border-[#9e9e9e1f] max-md:text-sm overflow-hidden">
        <div className="head grid grid-cols-6  max-md:grid-cols-5  w-full bg-zinc-950 h-14 items-center justify-between pl-10 max-md:px-1 max-lg:px-2">
          <p>Patient</p>
          <p className=" max-md:hidden">Date</p>
          <p>Status</p>
          <p>Doctor</p>
          <p>Actions</p> 
        </div>

    <div>
      {Array.isArray(users) && users.length > 0 ? (
        users.map((item: any) => (
          <div
            key={item.id}
            className="grid grid-cols-6 max-md:grid-cols-5 w-full overflow-x-auto items-center max-md:text-sm justify-between pl-10 max-md:px-1 max-lg:px-2 h-14 border-b-2 border-[#9e9e9e1f]"
          >
            <p className=" line-clamp-1">{item?.user?.username}</p>
            <p  className=" max-md:hidden">
              {new Intl.DateTimeFormat("en-IN").format(
                new Date(item.createdAt)
              )}
            </p>
            <p className={`${item.status.toLowerCase() === 'scheduled' ? 'text-[#24ae7c] bg-[#0d2a1f]' : item.status.toLowerCase() === 'pending' ? 'bg-[#152432] text-[#79b5ec]' : 'bg-[#3e1716] text-[#f37877]'} w-fit max-md:px-1 max-md:text-xs px-3 py-[2px] flex items-center gap-1 rounded-2xl`}  >
            {item.status.toLowerCase() === 'scheduled' ? <MdDone /> : item.status.toLowerCase() === 'pending' ? <GoHourglass /> : <RxCross2 /> }
              {item?.status}</p>

            <p className=" line-clamp-1">{item.doctor.name}</p>

            {item.schedule ? (
              <p>{new Intl.DateTimeFormat("en-IN").format(new Date(item.schedule))}</p>
            ) : (
              <p
                className="cursor-pointer flex items-center gap-2 max-md:gap-1 px-3 max-md:px-1 max-md:text-sm py-1 w-fit rounded-lg text-[#24ae7c] bg-[#0d2a1f]"
                onClick={() => setOpenScheduleId(openScheduleId === item.id ? null : item.id)}
              >
                <IoIosTimer className=" text-lg"/>
                Schedule
              </p>
            )}

            {openScheduleId === item.id && (
              <ScheduleForm data={item} setOpen={() => setOpenScheduleId(null)} />
            )}

            <p>
              <button
                onClick={() => setOpenCancelId(openCancelId === item.id ? null : item.id)}
                className="bg-[#f694ff] text-white px-2 py-1 rounded-md disabled:cursor-not-allowed"
                disabled={item.status.toLowerCase() === 'cancelled'}
                >
                Cancel
              </button>
            </p>

            {openCancelId === item.id && (
              <Cancelform data={item} setOpen={() => setOpenCancelId(null)} />
            )}
          </div>
        ))
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
       <Pagination page={page} count={count} />
      </div>
    </>
  );
}


export default AdminTabel;
