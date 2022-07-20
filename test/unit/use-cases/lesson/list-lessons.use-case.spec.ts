import { Test } from '@nestjs/testing'
import { LessonRepositoryMock } from '../../../../test/unit/mockery/lesson.mock'
import { LESSON_REPOSITORY_KEY } from '../../../../src/domain/lesson'
import { ListLessonsUseCase } from '../../../../src/use-cases/lesson/list-lessons.use-case'

describe('List Lessons Use Case', () => {
  let listLessonsUseCase: ListLessonsUseCase
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        ListLessonsUseCase,
        {
          provide: LESSON_REPOSITORY_KEY,
          useClass: LessonRepositoryMock
        }
      ]
    }).compile()

    listLessonsUseCase = moduleRef.get<ListLessonsUseCase>(ListLessonsUseCase)
  })

  it('should return valid list of lessons', async () => {
    const lessons = await listLessonsUseCase.execute()
    expect(lessons.length).toBe(1)
    expect(lessons[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      date: expect.any(Date),
      class: null
    })
  })
})
