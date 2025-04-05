 
import { userAppointments } from "@/actions/server.actions"
import Pagination from "@/components/Pagenation"; 
import { useAuth, useUser } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server"; 
import { GoHourglass } from "react-icons/go";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx"; 
import { redirect } from "next/navigation";

 async function MyprofilePage({searchParams}:{searchParams:{[key:string]:string|undefined};}) {
    const {page } = searchParams; 
    const p = page ?parseInt(page): 1;  
    const user = await currentUser();
    const userId  = user?.publicMetadata.userId as string;    
    const app = await userAppointments(p ,userId ) 

    function formatDate(dateStr: Date): string {
        const date = new Date(dateStr);     
        const optionsDate: Intl.DateTimeFormatOptions = { day: 'numeric',  month: 'short',year: 'numeric'};
        const formattedDate = date.toLocaleDateString('en-US', optionsDate);
        const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const formattedTime = date.toLocaleTimeString('en-US', optionsTime);
        return `${formattedDate} ${formattedTime}`;
    }
    
  const count = app.totalAppointments;
  if(userId !== '6708b5256bca88c3b101a35e'){
    return (
      
    <div className=" w-full min-h-screen px-20 max-md:px-2 ">
        <h1 className="logo2 text-4xl font-semibold text-gray-300 mt-5 capitalize">Your all appointments.</h1>

        <div className=" w-full flex flex-col mt-5 gap- relative rounded-xl border-t-2 border-x-2 border-[#9e9e9e1f] max-md:text-sm overflow-hidden">
        <div className="head grid grid-cols-5 gap-2  w-full bg-zinc-950 h-14 items-center justify-between px-10 max-md:px-1 max-lg:px-2">
          <p>Doctor</p>
          <p>hosital</p>
          <p>Date</p>
          <p>Status</p>
          <p>Scheduled Date</p> 
        </div>
             {
                app.users.map((item:any) => {
                    return (
                        <div key={item.id} className="grid grid-cols-5 gap-2 overflow-x-auto p-2 py-4 transition-all even:bg-[#6494ed0b] border-b-2 h-full hover:bg-[#d375dcb9] border-[#9e9e9e1f] ">
                            <p className="text-sm h-full line-clamp-1 ">{item.doctor?.name}</p>
                            <p className="text-sm h-full line-clamp-1 ">{item.doctor?.hospital?.name}</p>
                            <p className="text-sm h-full ">{item.createdAt ? formatDate(item?.createdAt) : '0 - 0 - 0'}</p>
                            <p className={`${ item.status && item.status.toLowerCase() === 'scheduled' ? 'text-[#24ae7c] bg-[#0d2a1f]' :  item.status && item.status.toLowerCase() === 'pending' ? 'bg-[#152432] text-[#79b5ec]' : 'bg-[#3e1716] text-[#f37877]'} w-fit max-md:px-1 max-md:h-fit max-md:py-[2px] px-3 py-[2px] flex items-center gap-1 rounded-2xl`}  >
                { item.status &&  item.status.toLowerCase() === 'scheduled' ? <MdDone /> :  item.status &&  item.status.toLowerCase() === 'pending' ? <GoHourglass /> : <RxCross2 /> }
                  {item?.status}</p>
                            <p className="text-sm h-full ">{item.schedule ? formatDate(item?.schedule) : 'not-scheduled'}</p>
                        </div>
                    );
                })
            }

        </div>

        <Pagination page={p} count={count} />
    </div>
 ); 
}
else{
  redirect('/admin');
}
}

export default MyprofilePage