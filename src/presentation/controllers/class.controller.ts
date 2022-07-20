import { MapInterceptor } from '@automapper/nestjs'
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, UseInterceptors } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Class, ClassDateNotAvailableException, InvalidClassDatesException } from 'src/domain/class'
import { AlreadyEnrolledException } from 'src/domain/student'
import { CreateClassUseCase } from 'src/use-cases/class/create-class.use-case'
import { EnrollStudentInClassUseCase } from 'src/use-cases/class/enroll-student-in-class.use-case'
import { ListClassesUseCase } from 'src/use-cases/class/list-classes.use-case'
import { RemoveClassUseCase } from 'src/use-cases/class/remove-class.use-case'
import { UpdateClassUseCase } from 'src/use-cases/class/update-class.use-case'
import {
  USE_CASE_CREATE_CLASS,
  USE_CASE_ENROLL_STUDENT_IN_CLASS,
  USE_CASE_LIST_CLASSES,
  USE_CASE_REMOVE_CLASS,
  USE_CASE_UPDATE_CLASS
} from 'src/use-cases/module'
import { ClassDTO, CreateClassDTO, EnrollStudentInClassDTO, UpdateClassDTO } from '../dto/class.dto'

@Controller('classes')
@ApiTags('classes')
export class ClassController {
  constructor (
    @Inject(USE_CASE_LIST_CLASSES)
    private readonly listClassesUseCase: ListClassesUseCase,
    @Inject(USE_CASE_CREATE_CLASS)
    private readonly createClassUseCase: CreateClassUseCase,
    @Inject(USE_CASE_UPDATE_CLASS)
    private readonly updateClassUseCase: UpdateClassUseCase,
    @Inject(USE_CASE_REMOVE_CLASS)
    private readonly removeClassUseCase: RemoveClassUseCase,
    @Inject(USE_CASE_ENROLL_STUDENT_IN_CLASS)
    private readonly enrollStudentInClassUseCase: EnrollStudentInClassUseCase
  ) {}

  @UseInterceptors(MapInterceptor(Class, ClassDTO, { isArray: true }))
  @Get()
  @ApiResponse({
    status: 200,
    description: 'List the classes.',
    type: ClassDTO
  })
  list (): Promise<Class[]> {
    return this.listClassesUseCase.execute()
  }

  @Post()
  @UseInterceptors(MapInterceptor(Class, ClassDTO))
  @ApiResponse({
    description: 'Create a new class.',
    type: ClassDTO
  })
  async create (@Body() createClassDto: CreateClassDTO): Promise<Class> {
    const { name, courseId, startDate, endDate } = createClassDto

    try {
      const newClass = await this.createClassUseCase.execute({
        name,
        courseId,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      })

      return newClass
    } catch (error) {
      if (error instanceof InvalidClassDatesException || error instanceof ClassDateNotAvailableException) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: error.message
        }, HttpStatus.BAD_REQUEST)
      }

      throw error
    }
  }

  @Put(':id')
  @UseInterceptors(MapInterceptor(Class, ClassDTO))
  @ApiResponse({
    status: 200,
    description: 'Update a class.',
    type: ClassDTO
  })
  async update (@Param('id') id: string, @Body() updateClassDto: UpdateClassDTO): Promise<Class> {
    const { name, courseId, startDate, endDate } = updateClassDto
    try {
      const updated = await this.updateClassUseCase.execute({
        id,
        name,
        courseId,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      })

      return updated
    } catch (error) {
      if (error instanceof InvalidClassDatesException || error instanceof ClassDateNotAvailableException) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: error.message
        }, HttpStatus.BAD_REQUEST)
      }

      throw error
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Remove a class.',
    type: String
  })
  async delete (@Param('id') id: string): Promise<string> {
    await this.removeClassUseCase.execute(id)
    return `Class #${id} removed!`
  }

  @Post('enroll-student')
  @ApiResponse({
    status: 200,
    description: 'Enroll a student in a class.',
    type: String
  })
  async enrollStudentInClass (@Body() enrollStudentInClassDTO: EnrollStudentInClassDTO): Promise<string> {
    const { studentId, classId } = enrollStudentInClassDTO

    try {
      await this.enrollStudentInClassUseCase.execute(studentId, classId)
      return `Student ${studentId} enrolled in class ${classId}`
    } catch (error) {
      if (error instanceof AlreadyEnrolledException) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: error.message
        }, HttpStatus.BAD_REQUEST)
      }

      throw error
    }
  }
}
