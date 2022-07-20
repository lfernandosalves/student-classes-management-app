import { Test } from '@nestjs/testing'
import { LessonRepositoryMock } from '../../../../test/unit/mockery/lesson.mock'
import { InvalidLessonDayException, Lesson, LESSON_REPOSITORY_KEY } from '../../../../src/domain/lesson'
import { CreateLessonData, CreateLessonUseCase } from '../../../../src/use-cases/lesson/create-lesson.use-case'
import { ClassRepositoryMock } from '../../../../test/unit/mockery/class.mock'
import { CLASS_REPOSITORY_KEY } from '../../../../src/domain/class'

describe('Create Lesson Use Case', () => {
  let createLessonUseCase: CreateLessonUseCase
  let lessonRepositoryMock: LessonRepositoryMock
  let classRepositoryMock: ClassRepositoryMock

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        CreateLessonUseCase,
        {
          provide: LESSON_REPOSITORY_KEY,
          useClass: LessonRepositoryMock
        },
        {
          provide: CLASS_REPOSITORY_KEY,
          useClass: ClassRepositoryMock
        }
      ]
    }).compile()

    createLessonUseCase = moduleRef.get<CreateLessonUseCase>(CreateLessonUseCase)
    lessonRepositoryMock = moduleRef.get<LessonRepositoryMock>(LESSON_REPOSITORY_KEY)
    classRepositoryMock = moduleRef.get<ClassRepositoryMock>(CLASS_REPOSITORY_KEY)
  })

  it('should throw exception if day is unavailable', async () => {
    const createData: CreateLessonData = {
      name: 'test',
      date: new Date(),
      classId: ''
    }

    await expect(createLessonUseCase.execute(createData)).rejects.toThrow(InvalidLessonDayException)
  })

  it('should throw exception if date is invalid due to class date range', async () => {
    const createData: CreateLessonData = {
      name: 'test',
      date: new Date('2022-01-10'),
      classId: ''
    }

    jest.spyOn(classRepositoryMock, 'findById').mockResolvedValueOnce({
      id: '123',
      name: 'Mock Class',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2021-05-01'),
      lessons: [],
      students: []
    })

    await expect(createLessonUseCase.execute(createData)).rejects.toThrow(InvalidLessonDayException)
  })

  it.todo('should throw exception if there is another lesson happening on date')

  it('should return valid lesson on success', async () => {
    const createData: CreateLessonData = {
      name: 'test',
      date: new Date('2022-01-10'),
      classId: ''
    }

    jest.spyOn(lessonRepositoryMock, 'getLessonOnDay').mockResolvedValueOnce(null)
    jest.spyOn(classRepositoryMock, 'findById').mockResolvedValueOnce({
      id: '123',
      name: 'Mock Class',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-12-01'),
      lessons: [],
      students: []
    })

    const lesson = await createLessonUseCase.execute(createData)
    expect(lesson.id).toBeDefined()
    expect(lesson.name).toEqual(createData.name)
    expect(lesson.date).toEqual(createData.date)
  })
})
