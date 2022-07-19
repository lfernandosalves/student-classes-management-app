import { MapInterceptor } from '@automapper/nestjs'
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Post, Put, UseInterceptors } from '@nestjs/common'
import { Class, InvalidClassDatesException } from 'src/domain/class'
import { CreateClassUseCase } from 'src/use-cases/class/create-class.use-case'
import { ListClassesUseCase } from 'src/use-cases/class/list-classes.use-case'
import { RemoveClassUseCase } from 'src/use-cases/class/remove-class.use-case'
import { UpdateClassUseCase } from 'src/use-cases/class/update-class.use-case'
import { USE_CASE_CREATE_CLASS, USE_CASE_LIST_CLASSES, USE_CASE_REMOVE_CLASS, USE_CASE_UPDATE_CLASS } from 'src/use-cases/module'
import { ClassDTO, CreateClassDTO, UpdateClassDTO } from '../dto/class.dto'

@Controller('classes')
export class ClassController {
  constructor (
    @Inject(USE_CASE_LIST_CLASSES)
    private readonly listClassesUseCase: ListClassesUseCase,
    @Inject(USE_CASE_CREATE_CLASS)
    private readonly createClassUseCase: CreateClassUseCase,
    @Inject(USE_CASE_UPDATE_CLASS)
    private readonly updateClassUseCase: UpdateClassUseCase,
    @Inject(USE_CASE_REMOVE_CLASS)
    private readonly removeClassUseCase: RemoveClassUseCase
  ) {}

  @UseInterceptors(MapInterceptor(Class, ClassDTO, { isArray: true }))
  @Get()
  list (): Promise<Class[]> {
    return this.listClassesUseCase.execute()
  }

  @Post()
  @HttpCode(204)
  async create (@Body() createClassDto: CreateClassDTO): Promise<Class> {
    const { name, courseId, startDate, endDate } = createClassDto

    try {
      const newClass = await this.createClassUseCase.execute({
        name,
        courseId,
        startDate,
        endDate
      })

      return newClass
    } catch (error) {
      if (error instanceof InvalidClassDatesException) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: error.message
        }, HttpStatus.BAD_REQUEST)
      }
    }
  }

  @Put(':id')
  async update (@Param('id') id: string, @Body() updateClassDto: UpdateClassDTO): Promise<Class> {
    const { name, courseId, startDate, endDate } = updateClassDto
    try {
      const updated = await this.updateClassUseCase.execute({
        id,
        name,
        courseId,
        startDate,
        endDate
      })

      return updated
    } catch (error) {
      if (error instanceof InvalidClassDatesException) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: error.message
        }, HttpStatus.BAD_REQUEST)
      }
    }
  }

  @Delete(':id')
  async delete (@Param('id') id: string): Promise<string> {
    await this.removeClassUseCase.execute(id)
    return `Class #${id} removed!`
  }
}
