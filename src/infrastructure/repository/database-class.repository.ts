import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaModel } from 'prisma/model'
import { Class, ClassRepository } from 'src/domain/class'
import { CreateClassData } from 'src/use-cases/class/create-class.use-case'
import { UpdateClassData } from 'src/use-cases/class/update-class.use-case'
import { PrismaService, PRISMA_SERVICE_KEY } from '../common/prisma.service'

@Injectable()
export class DatabaseClassRepository implements ClassRepository {
  constructor (
    @InjectMapper()
    private readonly mapper: Mapper,
    @Inject(PRISMA_SERVICE_KEY)
    private readonly prisma: PrismaService) {}

  async listAll (): Promise<Class[]> {
    const classes = await this.prisma.class.findMany({
      include: {
        students: true,
        course: true
      }
    })
    return this.mapper.mapArray<PrismaModel.Class, Class>(<PrismaModel.Class[]>classes, PrismaModel.Class, Class)
  }

  async create (createData: CreateClassData): Promise<Class> {
    const { name, startDate, endDate, courseId } = createData
    const newClass = await this.prisma.class.create({
      data: {
        name,
        startDate,
        endDate,
        course: {
          connect: {
            id: courseId
          }
        }
      }
    })

    return this.mapper.map(<PrismaModel.Class>newClass, PrismaModel.Class, Class)
  }

  async update (updateData: UpdateClassData): Promise<Class> {
    const { name, startDate, endDate, courseId, id } = updateData
    const updatedClass = await this.prisma.class.update({
      data: {
        name,
        startDate,
        endDate,
        course: {
          connect: {
            id: courseId
          }
        }
      },
      where: {
        id
      }
    })

    return this.mapper.map(<PrismaModel.Class>updatedClass, PrismaModel.Class, Class)
  }

  async remove (id: string): Promise<boolean> {
    const deleted = await this.prisma.class.delete({
      where: {
        id
      }
    })

    return deleted !== undefined
  }

  async enrollStudentToClass (studentId: string, classId: string): Promise<boolean> {
    await this.prisma.student.update({
      data: {
        class: {
          connect: {
            id: classId
          }
        }
      },
      where: {
        id: studentId
      }
    })

    return true
  }

  async getClassesByDates (startDate: Date, endDate: Date): Promise<Class[]> {
    const classes = await this.prisma.class.findMany({
      where: {
        AND: [
          {
            OR: [
              { startDate: { lte: startDate } },
              { startDate: { lte: endDate } }
            ]
          },
          {
            OR: [
              { endDate: { gte: startDate } },
              { endDate: { gte: endDate } }
            ]
          }
        ]

      }
    })

    return this.mapper.mapArray<PrismaModel.Class, Class>(<PrismaModel.Class[]>classes, PrismaModel.Class, Class)
  }

  async findById (id: string): Promise<Class> {
    const found = await this.prisma.class.findUnique({
      where: {
        id
      }
    })
    return this.mapper.map(<PrismaModel.Class>found, PrismaModel.Class, Class)
  }
}
