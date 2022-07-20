import { Inject } from '@nestjs/common'
import { ClassRepository, CLASS_REPOSITORY_KEY } from '../../../src/domain/class'
import {
  InvalidLessonClassDateConflictException,
  InvalidLessonDayException,
  Lesson,
  LessonRepository,
  LESSON_REPOSITORY_KEY
} from '../../../src/domain/lesson'

export type UpdateLessonData = {
  id: string
  name: string
  date: Date
  classId: string
  meetingUrl?: string
  topics?: string
}

export class UpdateLessonUseCase {
  constructor (
    @Inject(LESSON_REPOSITORY_KEY)
    private readonly lessonRepository: LessonRepository,
    @Inject(CLASS_REPOSITORY_KEY)
    private readonly classRepository: ClassRepository
  ) {}

  async execute (updateData: UpdateLessonData): Promise<Lesson> {
    const { id, classId, date } = updateData
    if (!await this.isDayAvailable(date, classId, id)) {
      throw new InvalidLessonDayException()
    }

    if (!await this.isLessonDateValid(date, classId)) {
      throw new InvalidLessonClassDateConflictException()
    }

    return this.lessonRepository.update(updateData)
  }

  async isDayAvailable (date: Date, classId: string, id: string): Promise<boolean> {
    const lessonOnDay = await this.lessonRepository.getLessonOnDay(date, classId)
    return lessonOnDay === null || lessonOnDay.id === id
  }

  async isLessonDateValid (date: Date, classId: string): Promise<boolean> {
    const lessonClass = await this.classRepository.findById(classId)
    return lessonClass && date >= lessonClass.startDate && date <= lessonClass.endDate
  }
}
