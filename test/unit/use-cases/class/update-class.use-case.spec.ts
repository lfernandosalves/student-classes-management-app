import { Test } from '@nestjs/testing'
import { UpdateClassData, UpdateClassUseCase } from '../../../../src/use-cases/class/update-class.use-case'
import { CLASS_REPOSITORY_KEY, InvalidClassDatesException } from '../../../../src/domain/class'
import { ClassRepositoryMock } from '../../../../test/unit/mockery/class.mock'

describe('Update Class Use Case', () => {
  let updateClassUseCase: UpdateClassUseCase
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
