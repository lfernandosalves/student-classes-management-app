import { Inject } from '@nestjs/common'
import { Lesson, LessonRepository, LESSON_REPOSITORY_KEY } from '../../../src/domain/lesson'

export class ListLessonsUseCase {
  constructor (
    @Inject(LESSON_REPOSITORY_KEY)
    private readonly lessonRepository: LessonRepository
  ) {}

  async execute (): Promise<Lesson[]> {
    return this.lessonRepository.listAll()
  }
}
