import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaModel } from 'prisma/model'
import { Student, StudentRepository } from 'src/domain/student'
import { CreateStudentData } from 'src/use-cases/student/create-student.use-case'
import { UpdateStudentData } from 'src/use-cases/student/update-student.use-case'
import { PrismaService, PRISMA_SERVICE_KEY } from '../common/prisma.service'

@Injectable()
export class DatabaseStudentRepository implements StudentRepository {
  constructor (
    @InjectMapper()
    private readonly mapper: Mapper,
    @Inject(PRISMA_SERVICE_KEY)
    private readonly prisma: PrismaService) {}

  async listAll (): Promise<Student[]> {
    const students = await this.prisma.student.findMany({
      include: {
        classes: true
      }
    })
    return this.mapper.mapArray<PrismaModel.Student, Student>(<PrismaModel.Student[]>students, PrismaModel.Student, Student)
  }

  async create (createData: CreateStudentData): Promise<Student> {
    const { name, cpf, email } = createData
    const student = await this.prisma.student.create({
      data: {
        name,
        cpf,
        email
      }
    })

    return this.mapper.map(<PrismaModel.Student>student, PrismaModel.Student, Student)
  }

  async update (updateData: UpdateStudentData): Promise<Student> {
    const { name, cpf, email, id } = updateData
    const student = await this.prisma.student.update({
      data: {
        name,
        cpf,
        email
      },
      where: {
        id
      }
    })

    return this.mapper.map(<PrismaModel.Student>student, PrismaModel.Student, Student)
  }

  async remove (id: string): Promise<boolean> {
    const deleted = await this.prisma.student.delete({
      where: {
        id
      }
    })

    return deleted !== undefined
  }
}
