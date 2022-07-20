import { Test } from '@nestjs/testing'
import { LessonRepositoryMock } from '../../../../test/unit/mockery/lesson.mock'
import { InvalidLessonDayException, Lesson, LESSON_REPOSITORY_KEY } from '../../../../src/domain/lesson'
import { UpdateLessonData, UpdateLessonUseCase } from '../../../../src/use-cases/lesson/update-lesson.use-case'
import { ClassRepositoryMock } from '../../../../test/unit/mockery/class.mock'
import { Class, CLASS_REPOSITORY_KEY } from '../../../../src/domain/class'

describe('update Lesson Use Case', () => {
  let updateLessonUseCase: UpdateLessonUseCase
  let lessonRepositoryMock: LessonRepositoryMock
  let classRepositoryMock: ClassRepositoryMock

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        UpdateLessonUseCase,
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

    updateLessonUseCase = moduleRef.get<UpdateLessonUseCase>(UpdateLessonUseCase)
    lessonRepositoryMock = moduleRef.get<LessonRepositoryMock>(LESSON_REPOSITORY_KEY)
    classRepositoryMock = moduleRef.get<ClassRepositoryMock>(CLASS_REPOSITORY_KEY)
  })

  it('should throw exception if day is unavailable', async () => {
    const updateData: UpdateLessonData = {
      id: '123',
      name: 'test',
      date: new Date(),
      classId: ''
    }

    await expect(updateLessonUseCase.execute(updateData)).rejects.toThrow(InvalidLessonDayException)
  })

  it('should not throw exception if day is unavailable but its the lesson itself', async () => {
    const updateData: UpdateLessonData = {
      id: 'lesson-123',
      name: 'test',
      date: new Date(),
      classId: ''
    }

    jest.spyOn(lessonRepositoryMock, 'getLessonOnDay').mockResolvedValueOnce({
      id: updateData.id,
      name: updateData.name,
      date: updateData.date,
      class: new Class()
    })
    jest.spyOn(classRepositoryMock, 'findById').mockResolvedValueOnce({
      id: '123',
      name: 'Mock Class',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-12-01'),
      lessons: [],
      students: []
    })

    const result = await updateLessonUseCase.execute(updateData)
    expect(result.id).toBeDefined()
  })

  it('should throw exception if date is invalid due to class date range', async () => {
    const updateData: UpdateLessonData = {
      id: '123',
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

    await expect(updateLessonUseCase.execute(updateData)).rejects.toThrow(InvalidLessonDayException)
  })

  it.todo('should throw exception if there is another lesson happening on date')

  it('should return valid lesson on success', async () => {
    const updateData: UpdateLessonData = {
      id: '123',
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

    const lesson = await updateLessonUseCase.execute(updateData)
    expect(lesson.id).toBeDefined()
    expect(lesson.name).toEqual(updateData.name)
    expect(lesson.date).toEqual(updateData.date)
  })
})
