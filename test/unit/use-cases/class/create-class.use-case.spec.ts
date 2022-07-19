import { Test } from '@nestjs/testing'
import { CreateClassData, CreateClassUseCase } from '../../../../src/use-cases/class/create-class.use-case'
import { CLASS_REPOSITORY_KEY, InvalidClassDatesException } from '../../../../src/domain/class'
import { ClassRepositoryMock } from '../../../../test/unit/mockery/class.mock'

describe('Create Class Use Case', () => {
  let createClassUseCase: CreateClassUseCase
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        CreateClassUseCase,
        {
          provide: CLASS_REPOSITORY_KEY,
          useClass: ClassRepositoryMock
        }
      ]
    }).compile()

    createClassUseCase = moduleRef.get<CreateClassUseCase>(CreateClassUseCase)
  })

  it('should throw exception if dates are invalid', async () => {
    const createData: CreateClassData = {
      name: 'test',
      startDate: new Date('2022-10-01'),
      endDate: new Date('2022-01-01'),
      courseId: '123'
    }
    await expect(createClassUseCase.execute(createData)).rejects.toThrow(InvalidClassDatesException)
  })

  it('should return valid student on success', async () => {
    const createData: CreateClassData = {
      name: 'test',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-11-01'),
      courseId: '123'
    }

    const newClass = await createClassUseCase.execute(createData)
    expect(newClass.id).toBeDefined()
    expect(newClass.name).toEqual(createData.name)
    expect(newClass.startDate).toEqual(createData.startDate)
    expect(newClass.endDate).toEqual(createData.endDate)
    expect(newClass.course).toEqual(null)
    expect(newClass.lessons).toEqual([])
    expect(newClass.students).toEqual([])
  })
})
