import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createUser (): Promise<void> {
  if (await prisma.user.count() > 0) {
    return console.log('User already created!')
  }
  const user = await prisma.user.create({
    data: {
      name: 'Seed User',
      email: 'seed@test.com'
    }
  })

  console.log(`created user ${user.name}`)
}

async function createCourse (): Promise<void> {
  if (await prisma.course.count() > 0) {
    return console.log('Course already created!')
  }
  const course = await prisma.course.createMany({
    data: [
      {
        name: 'Programação'
      }, {
        name: 'Design'
      }
    ]
  })

  console.log('created courses')
}

async function createStudentsAndClass (): Promise<void> {
  if (await prisma.student.count() > 0) {
    return console.log('Student already created!')
  }
  const student = await prisma.student.create({
    data: {
      name: 'Seed Student',
      email: 'student@test.com',
      cpf: '1234567890',
      class: {
        create: {
          name: 'Class 01',
          startDate: new Date('2020-01-01'),
          endDate: new Date('2020-05-20'),
          course: {
            create: {
              name: 'Curso de Exemplo'
            }
          }
        }
      }
    }
  })

  console.log(`created student ${student.name}`)
}

async function main () {
  console.log('Start seeding ...')
  await createUser()
  await createCourse()
  await createStudentsAndClass()
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
