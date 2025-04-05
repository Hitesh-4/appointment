'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const Allappointments = async (page: number ) => {
    try {
      const [users ,totalAppointments] = await prisma.$transaction([
        prisma.appointment.findMany({
          take:6,
          skip:6*(page-1) ,
          select: {
            id: true,
            createdAt: true,
            status: true,
            schedule:true,
            doctor: {
              select: {
                id: true,
                name: true,
                hospital: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            },
            user: {
              select: {
                id: true,
                username: true
              }
            }
          }
        }),
        prisma.appointment.count()
       ]);

      // return { users: users || [], totalAppointments };  
      return JSON.parse(JSON.stringify({ users: users || [], totalAppointments }));
    } catch (error) {
      return { users: [], totalAppointments: 0 }; 
    }
  };
export const userAppointments = async (page: number ,   userId:string) => {
    try { 
      if(!userId){ 
        console.log('userid non');
        
        return { users: [], totalAppointments: 0 }; 
      } 
   console.log(userId);
   
      const [  users , totalAppointments] = await prisma.$transaction([
        
        prisma.appointment.findMany({
          take:6,
          skip:6*(page-1) ,
          where:{
            userId:userId
          },
          select: {
            id: true,
            createdAt: true,
            status: true,
            schedule:true,
            doctor: {
              select: {
                id: true,
                name: true,
                hospital: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            },
            user: {
              select: {
                id: true,
                username: true
              }
            }
          }
        }),
        prisma.appointment.count({
          where:{
            userId:userId
          },
        })
      ])

       
      // return { users: users || [], totalAppointments }; 
      return JSON.parse(JSON.stringify({ users: users || [], totalAppointments }));
    } catch (error) {
      return { users: [], totalAppointments: 0 }; 
    }
  };
  


export const createdAppointment = async ({doctorId , hospitalId , userId} :{doctorId : string , hospitalId :string , userId:string} ) => {
    try {
       
      if(!doctorId && !hospitalId && !userId){
        return {success : false}; 
      } 
        const appointment = await prisma.appointment.create({
            data: {
              hospitalId: hospitalId, 
              userId: userId,
              doctorId: doctorId,
              status: 'pending',
              cancelled: false,
            },
          });
 
          return JSON.parse(JSON.stringify({success : true , id: appointment.id}));
        
      } catch (error) {
        return {success : false}; 
    }
}
export const findAppointment = async (id: string|null) => {
  try {
    if(!id){return}
    const appointment = await prisma.appointment.findUnique({
      where:{
        id: id
      },
      select:{
        createdAt:true,
         doctor:true,
         status:true
        }
    })
    return JSON.parse(JSON.stringify(appointment))
  } catch (error) {
    
  }
}
export const selectDoctor = async () => {
    try {
        const hospital = await prisma.hospital.findMany({
            select: {
                id: true,
                name: true,
                
            }
        })
        
        return JSON.parse(JSON.stringify(hospital))

    } catch (error) {
        
    }
}

export const findDoctor = async (id: string) => {
    try {
        const doctor = await prisma.doctor.findMany({
            where: {
                hospitalId: id
            },
            select: {
                id: true,
                name: true,
                hospital: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        return JSON.parse(JSON.stringify(doctor))
    } catch (error) {
        
    }
}
export const findSpecialization = async (id: string) => {
    try {
        const disease = await prisma.disease.findMany({
          where:{
            hospitalId:id
          },
          select:{
            id:true,
            name:true,

            doctor:{
              select:{
                id:true,
                name:true,
                specialization:true
              }
            }
          }
        })

        return JSON.parse(JSON.stringify(disease))
    } catch (error) {
        
    }
}
 
export const scheduleAppointment = async ({ userId, appointmentId, schedule }: { appointmentId: string; userId: string; schedule: any }) => {
  try {
    console.log(userId, schedule, appointmentId);

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      
      return;
    }

    if (appointment.userId !== userId) { 
      return;
    }

   const app =  await prisma.appointment.update({
      where: {
        id: appointmentId,
        // userId: userId,
      },
      data: {
        status: 'Scheduled',
        schedule: schedule,
      },
    });
      
  } catch (error) {
    console.error('Error updating appointment:', error);
  }
};

export const CancelAppointment = async ({ userId , appointmentId   } : { appointmentId :string , userId : string ,  }) => {  

  try {
    await prisma.appointment.update({
      where:{
        id: appointmentId,
        userId: userId 
      },
      data:{
        status: 'Cancelled',
        schedule: null
      }
    })
    
  } catch (error) {

  }
}

interface uerProps {
  user: {
    clerkId: string;
    email: string;
    username: string;
  }
}
export const createUser = async (user:any) => {  

  try {
    const newUser = await prisma.user.create({
      data:{
        username:user.username,
        email:user.email,
        clerkId:user.clerkId 
      }
    })
    console.log(newUser);
    
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    console.log('error when creating user' , error);
    
  }
}

export const createdDoctor = async ()=>{
  try {
    const doctor = await prisma.doctor.create({
      data:{
        name:'lalala',

      }
    })
    return JSON.parse(JSON.stringify(true))
  } catch (error) {
    
  }
}