import { MapInterceptor } from '@automapper/nestjs'
import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, UseInterceptors } from '@nestjs/common'
import { Student } from 'src/domain/student'
import { USE_CASE_CREATE_STUDENT, USE_CASE_LIST_STUDENTS, USE_CASE_REMOVE_STUDENT, USE_CASE_UPDATE_STUDENT } from 'src/use-cases/module'
import { CreateStudentsUseCase } from 'src/use-cases/student/create-student.use-case'
import { ListStudentsUseCase } from 'src/use-cases/student/list-students.use-case'
import { RemoveStudentsUseCase } from 'src/use-cases/student/remove-student.use-case'
import { UpdateStudentsUseCase } from 'src/use-cases/student/update-student.use-case'
import { CreateStudentDTO, StudentDTO, UpdateStudentDTO } from '../dto/student.dto'

@Controller('students')
export class StudentController {
  constructor (
    @Inject(USE_CASE_LIST_STUDENTS)
    private readonly listStudentsUseCase: ListStudentsUseCase,
    @Inject(USE_CASE_CREATE_STUDENT)
    private readonly createStudentUseCase: CreateStudentsUseCase,
    @Inject(USE_CASE_UPDATE_STUDENT)
    private readonly updateStudentUseCase: UpdateStudentsUseCase,
    @Inject(USE_CASE_REMOVE_STUDENT)
    private readonly removeStudentUseCase: RemoveStudentsUseCase
  ) {}

  @UseInterceptors(MapInterceptor(Student, StudentDTO, { isArray: true }))
  @Get()
  list (): Promise<Student[]> {
    return this.listStudentsUseCase.execute()
  }

  @Post()
  @HttpCode(204)
  async create (@Body() createStudentDto: CreateStudentDTO): Promise<Student> {
    const { email, name, cpf } = createStudentDto
    return this.createStudentUseCase.execute({
      name,
      email,
      cpf
    })
  }

  @Put(':id')
  async update (@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDTO): Promise<Student> {
    const { email, name, cpf } = updateStudentDto
    return this.updateStudentUseCase.execute({
      id,
      name,
      email,
      cpf
    })
  }

  @Delete(':id')
  async delete (@Param('id') id: string): Promise<string> {
    const deleted = await this.removeStudentUseCase.execute(id)
    return `Student #${id} removed!`
  }
}
