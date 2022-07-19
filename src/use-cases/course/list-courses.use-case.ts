import { Inject } from '@nestjs/common'
import { Course, CourseRepository, COURSE_REPOSITORY_KEY } from '../../../src/domain/course'

export class ListCoursesUseCase {
  constructor (
    @Inject(COURSE_REPOSITORY_KEY)
    private readonly courseRepository: CourseRepository
  ) {}

  async execute (): Promise<Course[]> {
    return this.courseRepository.listAll()
  }
}
