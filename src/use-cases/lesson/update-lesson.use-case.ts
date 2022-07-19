import { Inject } from '@nestjs/common'
import { Lesson, LessonRepository, LESSON_REPOSITORY_KEY } from '../../../src/domain/lesson'

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
    private readonly lessonRepository: LessonRepository
  ) {}

  async execute (updateData: UpdateLessonData): Promise<Lesson> {
    return this.lessonRepository.update(updateData)
  }
}
