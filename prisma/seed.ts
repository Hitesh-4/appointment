import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample hospitals
  const hospitals = await Promise.all([
    prisma.hospital.create({ data: { name: 'General Hospital', address: '123 Main St' } }),
    prisma.hospital.create({ data: { name: 'City Medical Center', address: '456 Elm St' } }),
    prisma.hospital.create({ data: { name: 'Lakeside Hospital', address: '789 Lake Rd' } }),
    prisma.hospital.create({ data: { name: 'Green Valley Clinic', address: '234 Green St' } }),
    prisma.hospital.create({ data: { name: 'Sunnydale Hospital', address: '345 Sunny St' } }),
    prisma.hospital.create({ data: { name: 'Mountainview Medical', address: '678 Mountain Rd' } }),
    prisma.hospital.create({ data: { name: 'Riverside General', address: '135 River Ave' } }),
    prisma.hospital.create({ data: { name: 'Eastside Medical Center', address: '246 East St' } }),
    prisma.hospital.create({ data: { name: 'West End Hospital', address: '357 West St' } }),
  ]);

  // Create sample doctors
  const doctors = await Promise.all(
    hospitals.flatMap((hospital) =>
      Array.from({ length: 3 }, (_, index) =>
        prisma.doctor.create({
          data: {
            name: `Dr. ${index + 1} ${hospital.name.split(' ')[0]}`,
            specialization: `Specialization ${index + 1}`,
            hospitalId: hospital.id,
          },
        })
      )
    )
  );

  // Create sample diseases
  const diseases = await Promise.all(
    doctors.flatMap((doctor) =>
      Array.from({ length: 3 }, (_, index) =>
        prisma.disease.create({
          data: {
            name: `Disease ${index + 1} of ${doctor.name}`,
            doctorId: doctor.id,
            hospitalId: doctor.hospitalId,
          },
        })
      )
    )
  );

  // Create sample users
  const users = await Promise.all(
    Array.from({ length: 9 }, (_, index) =>
      prisma.user.create({
        data: {
          email: `user${index + 1}@example.com`,
          username: `user${index + 1}`,
          clerkId:`user${index+2}`,
          hospitalId: hospitals[index % hospitals.length].id,
        },
      })
    )
  );

  // Create sample appointments
  const appointments = await Promise.all(
    users.flatMap((user, index) =>
      Array.from({ length: 2 }, (_, apptIndex) =>
        prisma.appointment.create({
          data: {
            createdAt: new Date(),
            hospitalId: hospitals[index % hospitals.length].id,
            userId: user.id,
            doctorId: doctors[index % doctors.length].id,
            status: apptIndex % 2 === 0 ? 'Scheduled' : 'Cancelled',
            schedule: new Date(Date.now() + (apptIndex + 1) * 86400000), // 1 or 2 days later
            cancelled: apptIndex % 2 === 1,
          },
        })
      )
    )
  );

  console.log('Seed data created:');
  // console.log({ hospitals, doctors, diseases, users, appointments });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
