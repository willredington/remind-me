import { PrismaClient } from '@prisma/client';
import { FrequencyUnit } from '@remind-me/shared/util-frequency';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

const coordinates = {
  home: [40.076122206530755, -83.03755291349275],
  work: [40.06257781128127, -82.9134106200442],
  groceryStore: [40.101010985682514, -83.0868968866362],
  church: [40.106713442867054, -83.06550318162945],
  gym: [40.103756912629066, -83.08920784477017],
  doctor: [40.06352345093117, -83.05481593910203],
  barber: [40.064475274555186, -83.05335681808292],
  airport: [40.079674748226644, -83.07296946159957],
  bar: [40.093454213358754, -83.04464534550357],
};

async function main() {
  const now = DateTime.now();

  const profile = await prisma.profile.create({
    data: {
      userId: 'user-1',
      userName: 'Will',
    },
  });

  const homeLocation = await prisma.location.create({
    data: {
      type: 'Home',
      name: 'Home',
      address: '123 Main St, Columbus, Ohio 43235',
      owner: {
        connect: {
          id: profile.id,
        },
      },
      latitude: coordinates.home[0],
      latitudeDirection: 'North',
      longitude: coordinates.home[1],
      longitudeDirection: 'West',
    },
  });

  const workLocation = await prisma.location.create({
    data: {
      type: 'Work',
      name: 'Work',
      address: '123 Work St, Columbus, Ohio 43235',
      owner: {
        connect: {
          id: profile.id,
        },
      },
      latitude: coordinates.work[0],
      latitudeDirection: 'North',
      longitude: coordinates.work[1],
      longitudeDirection: 'West',
    },
  });

  const groceryStoreLocation = await prisma.location.create({
    data: {
      type: 'Grocery',
      name: 'Grocery Store',
      address: '123 Food St, Columbus, Ohio 43235',
      owner: {
        connect: {
          id: profile.id,
        },
      },
      latitude: coordinates.groceryStore[0],
      latitudeDirection: 'North',
      longitude: coordinates.groceryStore[1],
      longitudeDirection: 'West',
    },
  });

  const churchLocation = await prisma.location.create({
    data: {
      type: 'Church',
      name: 'Church',
      address: '123 Holy St, Columbus, Ohio 43235',
      owner: {
        connect: {
          id: profile.id,
        },
      },
      latitude: coordinates.church[0],
      latitudeDirection: 'North',
      longitude: coordinates.church[1],
      longitudeDirection: 'West',
    },
  });

  const gymLocation = await prisma.location.create({
    data: {
      type: 'Gym',
      name: 'Gym',
      address: '123 Fitness St, Columbus, Ohio 43235',
      owner: {
        connect: {
          id: profile.id,
        },
      },
      latitude: coordinates.gym[0],
      latitudeDirection: 'North',
      longitude: coordinates.gym[1],
      longitudeDirection: 'West',
    },
  });

  const doctorLocation = await prisma.location.create({
    data: {
      type: 'Medical',
      name: 'Doctor Office',
      address: '123 Doctor St, Columbus, Ohio 43235',
      owner: {
        connect: {
          id: profile.id,
        },
      },
      latitude: coordinates.doctor[0],
      latitudeDirection: 'North',
      longitude: coordinates.doctor[1],
      longitudeDirection: 'West',
    },
  });

  await prisma.taskTemplate.create({
    data: {
      name: 'Grocery Store',
      isAuto: true,
      frequency: {
        create: {
          unit: FrequencyUnit.Week,
          value: 1,
          ownerId: profile.id,
        },
      },
      location: {
        connect: {
          id: groceryStoreLocation.id,
        },
      },
      owner: {
        connect: {
          id: profile.id,
        },
      },
    },
  });

  // doctor's appointment
  await prisma.task.create({
    data: {
      name: 'Dr Appointment',
      locationId: doctorLocation.id,
      startDate: now
        .set({
          hour: 9,
        })
        .toJSDate(),
      endDate: now
        .set({
          hour: 12,
        })
        .toJSDate(),
      ownerId: profile.id,
    },
  });

  // // recurring tasks
  // await prisma.recurringTask.create({
  //   data: {
  //     name: 'Work',
  //     owner: {
  //       connect: {
  //         id: profile.id,
  //       },
  //     },
  //     location: {
  //       connect: {
  //         id: workLocation.id,
  //       },
  //     },
  //     frequency: {
  //       create: {
  //         unit: FrequencyUnit.Week,
  //         value: 1,
  //         days: ALL_FREQUENCY_DAYS,
  //         ownerId: profile.id,
  //       },
  //     },
  //   },
  // });

  // await prisma.recurringTask.create({
  //   data: {
  //     name: 'Grocery Store',
  //     owner: {
  //       connect: {
  //         id: profile.id,
  //       },
  //     },
  //     location: {
  //       connect: {
  //         id: groceryStoreLocation.id,
  //       },
  //     },
  //     frequency: {
  //       create: {
  //         unit: FrequencyUnit.Day,
  //         value: 3,
  //         ownerId: profile.id,
  //       },
  //     },
  //   },
  // });

  // await prisma.recurringTask.create({
  //   data: {
  //     name: 'Gym',
  //     owner: {
  //       connect: {
  //         id: profile.id,
  //       },
  //     },
  //     location: {
  //       connect: {
  //         id: gymLocation.id,
  //       },
  //     },
  //     frequency: {
  //       create: {
  //         unit: FrequencyUnit.Week,
  //         value: 1,
  //         ownerId: profile.id,
  //         days: [
  //           FrequencyDay.Monday,
  //           FrequencyDay.Wednesday,
  //           FrequencyDay.Friday,
  //         ],
  //       },
  //     },
  //   },
  // });

  // const [mon, tues, wed, thurs, fri, sat, sun] = [...Array(7).keys()].map(
  //   (index) =>
  //     now.set({
  //       weekday: index + 1,
  //     })
  // );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
