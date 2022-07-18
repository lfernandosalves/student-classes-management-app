import { Controller, Get, Inject } from '@nestjs/common'
import { Student } from 'src/domain/student'
import { USE_CASE_LIST_STUDENTS } from 'src/use-cases/module'
import { ListStudentsUseCase } from 'src/use-cases/student/list-students'

@Controller('students')
export class StudentController {
  // eslint-disable-next-line no-useless-constructor
  constructor (@Inject(USE_CASE_LIST_STUDENTS) private readonly listStudents: ListStudentsUseCase) {}

  @Get()
  getHello (): Promise<Student[]> {
    return this.listStudents.execute()
  }
}
