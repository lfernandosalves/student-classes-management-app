import { MapInterceptor } from '@automapper/nestjs'
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Post, Put, UseInterceptors } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { InvalidCpfException, Student } from 'src/domain/student'
import { USE_CASE_CREATE_STUDENT, USE_CASE_LIST_STUDENTS, USE_CASE_REMOVE_STUDENT, USE_CASE_UPDATE_STUDENT } from 'src/use-cases/module'
import { CreateStudentsUseCase } from 'src/use-cases/student/create-student.use-case'
import { ListStudentsUseCase } from 'src/use-cases/student/list-students.use-case'
import { RemoveStudentsUseCase } from 'src/use-cases/student/remove-student.use-case'
import { UpdateStudentsUseCase } from 'src/use-cases/student/update-student.use-case'
import { CreateStudentDTO, StudentDTO, UpdateStudentDTO } from '../dto/student.dto'

@Controller('students')
@ApiTags('students')
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
  @ApiResponse({
    status: 200,
    description: 'List students.',
    type: StudentDTO
  })
  list (): Promise<Student[]> {
    return this.listStudentsUseCase.execute()
  }

  @Post()
  @ApiResponse({
    description: 'Create a new student.',
    type: StudentDTO
  })
  async create (@Body() createStudentDto: CreateStudentDTO): Promise<Student> {
    const { email, name, cpf } = createStudentDto

    try {
      const student = await this.createStudentUseCase.execute({
        name,
        email,
        cpf
      })

      return student
    } catch (error) {
      if (error instanceof InvalidCpfException) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: error.message
        }, HttpStatus.BAD_REQUEST)
      }
    }
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update a student.',
    type: StudentDTO
  })
  async update (@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDTO): Promise<Student> {
    const { email, name, cpf } = updateStudentDto
    try {
      const updated = await this.updateStudentUseCase.execute({
        id,
        name,
        email,
        cpf
      })

      return updated
    } catch (error) {
      if (error instanceof InvalidCpfException) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: error.message
        }, HttpStatus.BAD_REQUEST)
      }
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Remove a student.',
    type: String
  })
  async delete (@Param('id') id: string): Promise<string> {
    const deleted = await this.removeStudentUseCase.execute(id)
    return `Student #${id} removed!`
  }
}
