"use client";

import {createdAppointment,findSpecialization,} from "@/actions/server.actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function Appointments({
  hospital,
}: {
  hospital: { id: string; name: string }[];
}) {
  const [hospitalId, setHospitalId] = useState<string | undefined>(
    hospital[0]?.id || undefined
  );

  const [special, setSpecial] = useState<any>([]);
 
  const router = useRouter();
  useEffect(() => {
    const fetchDoctors = async () => {
      if (hospitalId) {
        const res: any = await findSpecialization(hospitalId);
        setSpecial(res);
      }
    };
    fetchDoctors();
  }, [hospitalId]);
 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const hospitalId = formData.get("hospital") as string;
    const doctorId = formData.get("doctor") as string;
    const email = formData.get("email") as string;
    const city = formData.get("city") as string;
    const name = formData.get("name") as string;
    const gender = formData.get("gender") as string;
    const message = formData.get("message") as string;
    const phone = formData.get("phone") as string;

    const res = await createdAppointment({ doctorId, hospitalId  , email , city , name , gender , message , phone});
    if (res.success === true) {

      router.push(`success?appId=${res.id}`);
    }
    else{
      alert("Something went wrong");
    }

  };

   
 
  return (
    <div className=" w-full h-[86vh] flex  rounded-2xl overflow-x-hidden max-md:flex-col">
      <form
        className=" flex w-[66%] max-md:p-7  p-20 pl-24 flex-col gap-5 footer2 max-md:w-full mx-auto "
        onSubmit={handleSubmit}
      >
        <h1 className=" text-4xl font-semibold logo2 ">Create Appointment</h1>
        <div className=" mt-2">
          <h1>Select Hospital</h1>
          <select
            required
            onChange={(e) => setHospitalId(e.target.value)}
            className="bg-transparent w-full p-2 px-3 outline-none cursor-pointer"
            name="hospital"
            value={hospitalId}
          >
            {hospital.map(({ id, name }) => (
              <option className=" bg-[#0f0a13]" key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <hr className="border border-gray-300 " />
        </div>

        <div className="flex grid-rows-2 gap-4 max-md:flex-col">
          <div className=" w-[50%] mt-2">
            <h1>Select Department</h1>
            <select
              required
              className="bg-transparent w-full max-md:[90%] p-2 px-3 outline-none cursor-pointer"
              name="spcial"
            >
              {special &&
                special.map((item: any) => {
                  return (
                    <option
                      className=" bg-[#0f0a13]"
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <hr className="border border-gray-300 " />
          </div>

          <div className=" w-[50%] mt-2">
            <h1>Select doctor</h1>
            <select
              required
              className="bg-transparent w-full max-md:w-[90%] outline-none cursor-pointer rounded-lg p-2 px-3"
              name="doctor"
            >
              {!special && !hospitalId && (
                <option className=" bg-[#0f0a13]" value="">
                  Select a doctor
                </option>
              )}
              {special &&
                hospitalId &&
                special
                  .flatMap(
                    (item: { doctor: { id: string; name: string }[] }) =>
                      item?.doctor || []
                  )
                  .filter(
                    (
                      doc: { id: string },
                      index: number,
                      self: { id: string }[]
                    ) =>
                      index ===
                      self.findIndex((d: { id: string }) => d.id === doc.id)
                  )
                  .map(
                    (doc: {
                      id: string;
                      name: string;
                      specialization: string;
                    }) => (
                      <option
                        className=" bg-[#0f0a13]"
                        key={doc.id}
                        value={doc.id}
                      >
                        {doc.name}
                      </option>
                    )
                  )}
            </select>
            <hr className="border border-gray-300 " />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className=" w-full mt-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="p-2 w-full outline-none bg-transparent"
              required
            />
            <hr className="border border-gray-300 " />
          </div>
          <div className=" w-full mt-2">
            <select
              name="gender"
              className="p-2 w-full outline-none cursor-pointer bg-transparent"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <hr className="border border-gray-300 " />
          </div>
          <div className=" w-full mt-2">
            <input
              type="tel"
              name="phone"
              placeholder="Mobile"
              className="p-2 w-full outline-none bg-transparent"
              required
            />
            <hr className="border border-gray-300 " />
          </div>
          <div className=" w-full mt-2">
            <input
              type="email"
              name="email"

              placeholder="Email"
              className="p-2 w-full outline-none bg-transparent"
              required
            />
            <hr className="border border-gray-300 " />
          </div>
          <div className=" w-full mt-2">
            <input
              type="text"
              name="city"

              placeholder="City"
              className="p-2 w-full outline-none bg-transparent"
              required
            />
            <hr className="border border-gray-300 " />
          </div>
          <div className=" w-full mt-2">
            <input
              type="text"
              name="uhid"

              placeholder="UHID (if any)"
              className="p-2 w-full outline-none bg-transparent"
            />
            <hr className="border border-gray-300 " />
          </div>
          <div className=" w-full mt-2 ">
          </div>
        </div>

        <div className=" w-full mt-2">
          <textarea
            name="message"placeholder="Message"className="w-full outline-none bg-transparent"></textarea>
          <hr className="border border-gray-300 " />
        </div>

        <button className=" bg-blue-500  mt-4 py-1 w-[50%] ml-52  flex items-center justify-center max-md:w-[90%] rounded-lg"type="submit">
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default Appointments;
