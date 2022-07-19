import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaModel } from 'prisma/model'
import { Course, CourseRepository } from 'src/domain/course'
import { PrismaService, PRISMA_SERVICE_KEY } from '../common/prisma.service'

@Injectable()
export class DatabaseCourseRepository implements CourseRepository {
  constructor (
    @InjectMapper()
    private readonly mapper: Mapper,
    @Inject(PRISMA_SERVICE_KEY)
    private readonly prisma: PrismaService) {}

  async listAll (): Promise<Course[]> {
    const courses = await this.prisma.course.findMany()
    return this.mapper.mapArray<PrismaModel.Course, Course>(<PrismaModel.Course[]>courses, PrismaModel.Course, Course)
  }
}
