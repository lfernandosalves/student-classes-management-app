import { MapInterceptor } from '@automapper/nestjs'
import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Course } from 'src/domain/course'
import { ListCoursesUseCase } from 'src/use-cases/course/list-courses.use-case'
import { USE_CASE_LIST_COURSES } from 'src/use-cases/module'
import { CourseDTO } from '../dto/course.dto'

@Controller('courses')
@ApiTags('courses')
export class CourseController {
  constructor (
    @Inject(USE_CASE_LIST_COURSES)
    private readonly listCoursesUseCase: ListCoursesUseCase
  ) {}

  @UseInterceptors(MapInterceptor(Course, CourseDTO, { isArray: true }))
  @Get()
  @ApiResponse({
    status: 200,
    description: 'List courses.',
    type: CourseDTO
  })
  list (): Promise<Course[]> {
    return this.listCoursesUseCase.execute()
  }
}
