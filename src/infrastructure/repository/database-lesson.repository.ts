import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaModel } from 'prisma/model'
import { Lesson, LessonRepository } from 'src/domain/lesson'
import { Student, StudentRepository } from 'src/domain/student'
import { CreateLessonData } from 'src/use-cases/lesson/create-lesson.use-case'
import { UpdateLessonData } from 'src/use-cases/lesson/update-lesson.use-case'
import { CreateStudentData } from 'src/use-cases/student/create-student.use-case'
import { UpdateStudentData } from 'src/use-cases/student/update-student.use-case'
import { PrismaService, PRISMA_SERVICE_KEY } from '../common/prisma.service'

@Injectable()
export class DatabaseLessonRepository implements LessonRepository {
  constructor (
    @InjectMapper()
    private readonly mapper: Mapper,
    @Inject(PRISMA_SERVICE_KEY)
    private readonly prisma: PrismaService) {}

  async listAll (): Promise<Lesson[]> {
    const lessons = await this.prisma.lesson.findMany({
    })
    return this.mapper.mapArray<PrismaModel.Lesson, Lesson>(<PrismaModel.Lesson[]>lessons, PrismaModel.Lesson, Lesson)
  }

  async create (createData: CreateLessonData): Promise<Lesson> {
    const { name, date, classId, meetingUrl, topics } = createData
    const lesson = await this.prisma.lesson.create({
      data: {
        name,
        date,
        meetingUrl,
        topics,
        class: {
          connect: {
            id: classId
          }
        }
      }
    })

    return this.mapper.map(<PrismaModel.Lesson>lesson, PrismaModel.Lesson, Lesson)
  }

  async update (updateData: UpdateLessonData): Promise<Lesson> {
    const { name, date, classId, meetingUrl, topics, id } = updateData
    const lesson = await this.prisma.lesson.update({
      data: {
        name,
        date,
        meetingUrl,
        topics,
        class: {
          connect: {
            id: classId
          }
        }
      },
      where: {
        id
      }
    })

    return this.mapper.map(<PrismaModel.Lesson>lesson, PrismaModel.Lesson, Lesson)
  }

  async remove (id: string): Promise<boolean> {
    const deleted = await this.prisma.lesson.delete({
      where: {
        id
      }
    })

    return deleted !== undefined
  }
}
