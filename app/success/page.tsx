 
'use client';
import { findAppointment } from '@/actions/server.actions';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GoHourglass } from 'react-icons/go';

function Successpage() {
  const p = useSearchParams();
  const appointmentId = p.get('appId');
  console.log(appointmentId);

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (appointmentId) {
        const res: any = await findAppointment(appointmentId);
        setData(res);
      }
    };
    
    fetchAppointment();
  }, [appointmentId]);

  console.log("res", data?.doctor);

  return (
    <div className='min-h-screen w-1/2 mx-auto flex flex-col justify-center gap-7'>
      <div className='flex flex-col items-center justify-center'>
        <Image className=' !w-34 !h-32' src={'/tick.svg'} height={300} width={300} alt=''/>
        <p className='font-semibold text-3xl text-center w-5/6'>
          Your <span className='text-[#f694ff]'>appointment</span> request has
          been successfully submitted!
        </p>
        <p className='text-gray-500 font-semibold mt-2'>
          We will be in touch shortly to confirm.
        </p>
        <p className='mt-2 flex items-center gap-2 bg-[#152432] text-[#79b5ec]  py-2 rounded-full px-6'>
        <GoHourglass className=' text-lg' />
          {data?.status}
        </p>
      </div>

      <div className='border-y-2 h-20 flex justify-between items-center border-[#9e9e9e1f] p-2'>
        <p>Requested <span className='text-[#f694ff]'>appointment</span> details:</p>
        <div className=' rounded-xl footer2  px-6 py-2'>{data?.doctor?.name}</div>
        <p>{data?.createdAt ? new Intl.DateTimeFormat("en-IN").format(new Date(data.createdAt)) : ''}</p>
      </div>
    </div>
  );
} 

export default function WrappedSuccessPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Successpage />
    </React.Suspense>
  );
}
