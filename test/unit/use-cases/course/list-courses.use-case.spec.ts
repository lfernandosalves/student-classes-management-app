import { Test } from '@nestjs/testing'
import { CourseRepositoryMock } from '../../../../test/unit/mockery/course.mock'
import { COURSE_REPOSITORY_KEY } from '../../../../src/domain/course'
import { ListCoursesUseCase } from '../../../../src/use-cases/course/list-courses.use-case'

describe('List courses Use Case', () => {
  let listcoursesUseCase: ListCoursesUseCase
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        ListCoursesUseCase,
        {
          provide: COURSE_REPOSITORY_KEY,
          useClass: CourseRepositoryMock
        }
      ]
    }).compile()

    listcoursesUseCase = moduleRef.get<ListCoursesUseCase>(ListCoursesUseCase)
  })

  it('should return valid list of courses', async () => {
    const courses = await listcoursesUseCase.execute()
    expect(courses.length).toBe(1)
    expect(courses[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String)
    })
  })
})
