import { Test } from '@nestjs/testing'
import { StudentRepositoryMock } from '../../../../test/unit/mockery/student.mock'
import { InvalidCpfException, STUDENT_REPOSITORY_KEY } from '../../../../src/domain/student'
import { UpdateStudentData, UpdateStudentsUseCase } from '../../../../src/use-cases/student/update-student.use-case'

describe('Update Student Use Case', () => {
  let updateStudentUseCase: UpdateStudentsUseCase
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        UpdateStudentsUseCase,
        {
          provide: STUDENT_REPOSITORY_KEY,
          useClass: StudentRepositoryMock
        }
      ]
    }).compile()

    updateStudentUseCase = moduleRef.get<UpdateStudentsUseCase>(UpdateStudentsUseCase)
  })

  it('should throw exception if cpf is invalid', async () => {
    const updateData: UpdateStudentData = {
      id: '123354',
      name: 'test',
      email: 'test@test.com',
      cpf: '111'
    }
    await expect(updateStudentUseCase.execute(updateData)).rejects.toThrow(InvalidCpfException)
  })

  it('should return valid student on success', async () => {
    const updateData: UpdateStudentData = {
      id: '123354',
      name: 'test',
      email: 'test@test.com',
      cpf: '44422200012'
    }

    const student = await updateStudentUseCase.execute(updateData)
    expect(student.id).toEqual(updateData.id)
    expect(student.name).toEqual(updateData.name)
    expect(student.email).toEqual(updateData.email)
    expect(student.cpf).toEqual(updateData.cpf)
    expect(student.classes).toEqual([])
  })
})
