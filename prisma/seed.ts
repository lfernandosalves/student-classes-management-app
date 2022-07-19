import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createUser (): Promise<void> {
  const user = await prisma.user.create({
    data: {
      name: 'Seed User',
      email: 'seed@test.com'
    }
  })

  console.log(`created user ${user.name}`)
}

async function createCourse (): Promise<void> {
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
  const student = await prisma.student.create({
    data: {
      name: 'Seed Student',
      email: 'student@test.com',
      cpf: '1234567890',
      classes: {
        create: {
          name: 'Class 01',
          startDate: new Date('2022-01-01'),
          endDate: new Date('2022-12-31'),
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
