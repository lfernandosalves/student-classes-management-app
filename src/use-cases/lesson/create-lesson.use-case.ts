import { Inject } from '@nestjs/common'
import { Lesson, LessonRepository, LESSON_REPOSITORY_KEY } from '../../../src/domain/lesson'

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
    private readonly lessonRepository: LessonRepository
  ) {}

  async execute (createData: CreateLessonData): Promise<Lesson> {
    return this.lessonRepository.create(createData)
  }
}
