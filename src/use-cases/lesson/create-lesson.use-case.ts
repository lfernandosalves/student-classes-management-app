import { Inject } from '@nestjs/common'
import { ClassRepository, CLASS_REPOSITORY_KEY } from 'src/domain/class'
import { InvalidLessonClassDateConflictException, InvalidLessonDayException, Lesson, LessonRepository, LESSON_REPOSITORY_KEY } from '../../../src/domain/lesson'

export type CreateLessonData = {
  name: string
  date: Date
  classId: string
  meetingUrl?: string
  topics?: string
}

export class CreateLessonUseCase {
  constructor (
    @Inject(LESSON_REPOSITORY_KEY)
    private readonly lessonRepository: LessonRepository,
    @Inject(CLASS_REPOSITORY_KEY)
    private readonly classRepository: ClassRepository
  ) {}

  async execute (createData: CreateLessonData): Promise<Lesson> {
    const { classId, date } = createData

    if (!await this.isDayAvailable(date, classId)) {
      throw new InvalidLessonDayException()
    }

    if (!await this.isLessonDateValid(date, classId)) {
      throw new InvalidLessonClassDateConflictException()
    }

    return this.lessonRepository.create(createData)
  }

  async isDayAvailable (date: Date, classId: string): Promise<boolean> {
    const lessonOnDay = await this.lessonRepository.getLessonOnDay(date, classId)
    return lessonOnDay === null
  }

  async isLessonDateValid (date: Date, classId: string): Promise<boolean> {
    const lessonClass = await this.classRepository.findById(classId)
    return lessonClass && date >= lessonClass.startDate && date <= lessonClass.endDate
  }

  async isUniqueDate (): Promise<boolean> {
    return false
  }
}
