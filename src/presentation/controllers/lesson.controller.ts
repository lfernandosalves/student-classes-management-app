import { MapInterceptor } from '@automapper/nestjs'
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Post, Put, UseInterceptors } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { InvalidClassDatesException } from 'src/domain/class'
import { InvalidLessonDayException, Lesson } from 'src/domain/lesson'
import { CreateLessonUseCase } from 'src/use-cases/lesson/create-lesson.use-case'
import { ListLessonsUseCase } from 'src/use-cases/lesson/list-lessons.use-case'
import { RemoveLessonUseCase } from 'src/use-cases/lesson/remove-lesson.use-case'
import { UpdateLessonUseCase } from 'src/use-cases/lesson/update-lesson.use-case'
import { USE_CASE_CREATE_LESSON, USE_CASE_LIST_LESSONS, USE_CASE_REMOVE_LESSON, USE_CASE_UPDATE_LESSON } from 'src/use-cases/module'
import { CreateLessonDTO, LessonDTO, UpdateLessonDTO } from '../dto/lesson.dto'

@Controller('lesson')
@ApiTags('lessons')
export class LessonController {
  constructor (
    @Inject(USE_CASE_LIST_LESSONS)
    private readonly listLessonsUseCase: ListLessonsUseCase,
    @Inject(USE_CASE_CREATE_LESSON)
    private readonly createLessonUseCase: CreateLessonUseCase,
    @Inject(USE_CASE_UPDATE_LESSON)
    private readonly updateLessonUseCase: UpdateLessonUseCase,
    @Inject(USE_CASE_REMOVE_LESSON)
    private readonly removeLessonUseCase: RemoveLessonUseCase
  ) {}

  @UseInterceptors(MapInterceptor(Lesson, LessonDTO, { isArray: true }))
  @Get()
  @ApiResponse({
    status: 200,
    description: 'List lessons.',
    type: LessonDTO
  })
  list (): Promise<Lesson[]> {
    return this.listLessonsUseCase.execute()
  }

  @Post()
  @ApiResponse({
    description: 'Create a new lesson.',
    type: LessonDTO
  })
  async create (@Body() createLessonDto: CreateLessonDTO): Promise<Lesson> {
    const { name, date, meetingUrl, topics, classId } = createLessonDto

    try {
      const newClass = await this.createLessonUseCase.execute({
        name,
        date: new Date(date),
        meetingUrl,
        topics,
        classId
      })

      return newClass
    } catch (error) {
      if (error instanceof InvalidClassDatesException || InvalidLessonDayException) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: error.message
        }, HttpStatus.BAD_REQUEST)
      }

      throw error
    }
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update a lesson.',
    type: LessonDTO
  })
  async update (@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDTO): Promise<Lesson> {
    const { name, date, meetingUrl, topics, classId } = updateLessonDto
    try {
      const updated = await this.updateLessonUseCase.execute({
        id,
        name,
        date: new Date(date),
        meetingUrl,
        topics,
        classId
      })

      return updated
    } catch (error) {
      if (error instanceof InvalidClassDatesException || InvalidLessonDayException) {
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
    description: 'Remove a lesson.',
    type: String
  })
  async delete (@Param('id') id: string): Promise<string> {
    await this.removeLessonUseCase.execute(id)
    return `Lesson #${id} removed!`
  }
}
