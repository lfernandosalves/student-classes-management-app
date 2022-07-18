import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaModel } from 'prisma/model'
import { Student, StudentRepository } from 'src/domain/student'
import { PrismaService, PRISMA_SERVICE_KEY } from '../common/prisma.service'

@Injectable()
export class DatabaseStudentRepository implements StudentRepository {
  constructor (
    @InjectMapper()
    private readonly mapper: Mapper,
    @Inject(PRISMA_SERVICE_KEY)
    private readonly prisma: PrismaService) {}

  async listAll (): Promise<Student[]> {
    const students = await this.prisma.student.findMany()
    const s = this.mapper.mapArray<PrismaModel.Student, Student>(<PrismaModel.Student[]>students, PrismaModel.Student, Student)
    return s
  }
}
