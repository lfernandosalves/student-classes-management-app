import { Inject } from '@nestjs/common'
import { LessonRepository, LESSON_REPOSITORY_KEY } from '../../../src/domain/lesson'

export class RemoveLessonUseCase {
  constructor (
    @Inject(LESSON_REPOSITORY_KEY)
    private readonly lessonRepository: LessonRepository
  ) {}

  async execute (id: string): Promise<boolean> {
    return this.lessonRepository.remove(id)
  }
}
