import { Test } from '@nestjs/testing'
import { UpdateClassData, UpdateClassUseCase } from '../../../../src/use-cases/class/update-class.use-case'
import { ClassDateNotAvailableException, CLASS_REPOSITORY_KEY, InvalidClassDatesException } from '../../../../src/domain/class'
import { ClassRepositoryMock } from '../../../../test/unit/mockery/class.mock'

describe('Update Class Use Case', () => {
  let updateClassUseCase: UpdateClassUseCase
  let classRepositoryMock: ClassRepositoryMock
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        UpdateClassUseCase,
        {
          provide: CLASS_REPOSITORY_KEY,
          useClass: ClassRepositoryMock
        }
      ]
    }).compile()

    updateClassUseCase = moduleRef.get<UpdateClassUseCase>(UpdateClassUseCase)
    classRepositoryMock = moduleRef.get<ClassRepositoryMock>(CLASS_REPOSITORY_KEY)
  })

  it('should throw exception if dates are invalid', async () => {
    const updateData: UpdateClassData = {
      id: '123',
      name: 'test',
      startDate: new Date('2022-10-01'),
      endDate: new Date('2022-01-01'),
      courseId: '123'
    }
    await expect(updateClassUseCase.execute(updateData)).rejects.toThrow(InvalidClassDatesException)
  })

  it('should throw exception if dates are not available', async () => {
    const updateData: UpdateClassData = {
      id: '321',
      name: 'test',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-04-01'),
      courseId: '123'
    }

    jest.spyOn(classRepositoryMock, 'getClassesByDates').mockResolvedValue([
      {
        id: '333',
        name: 'mock-class',
        startDate: new Date(),
        endDate: new Date(),
        course: null,
        lessons: [],
        students: []
      }
    ])

    await expect(updateClassUseCase.execute(updateData)).rejects.toThrow(ClassDateNotAvailableException)
  })

  it('should not throw exception if unavailable dates are from updated class itself', async () => {
    const updateData: UpdateClassData = {
      id: '321',
      name: 'test',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-04-01'),
      courseId: '123'
    }

    jest.spyOn(classRepositoryMock, 'getClassesByDates').mockResolvedValue([
      {
        id: updateData.id,
        name: updateData.name,
        startDate: updateData.startDate,
        endDate: updateData.endDate,
        course: null,
        lessons: [],
        students: []
      }
    ])

    const result = await updateClassUseCase.execute(updateData)
    expect(result.id).toBeDefined()
  })

  it('should return valid class on success', async () => {
    const updateData: UpdateClassData = {
      id: '123',
      name: 'test',
      startDate: new Date('2022-10-01'),
      endDate: new Date('2022-11-01'),
      courseId: '123'
    }

    const updatedClass = await updateClassUseCase.execute(updateData)
    expect(updatedClass.id).toEqual(updateData.id)
    expect(updatedClass.name).toEqual(updateData.name)
    expect(updatedClass.startDate).toEqual(updatedClass.startDate)
    expect(updatedClass.endDate).toEqual(updatedClass.endDate)
    expect(updatedClass.course).toEqual(null)
    expect(updatedClass.lessons).toEqual([])
    expect(updatedClass.students).toEqual([])
  })
})
