import { MapInterceptor } from '@automapper/nestjs'
import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common'
import { Course } from 'src/domain/course'
import { ListCoursesUseCase } from 'src/use-cases/course/list-courses.use-case'
import { USE_CASE_LIST_COURSES } from 'src/use-cases/module'
import { CourseDTO } from '../dto/course.dto'

@Controller('courses')
export class CourseController {
  constructor (
    @Inject(USE_CASE_LIST_COURSES)
    private readonly listCoursesUseCase: ListCoursesUseCase
  ) {}

  @UseInterceptors(MapInterceptor(Course, CourseDTO, { isArray: true }))
  @Get()
  list (): Promise<Course[]> {
    return this.listCoursesUseCase.execute()
  }
}
