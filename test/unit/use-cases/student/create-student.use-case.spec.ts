import { Test } from '@nestjs/testing'
import { StudentRepositoryMock } from '../../../../test/unit/mockery/student.mock'
import { InvalidCpfException, STUDENT_REPOSITORY_KEY } from '../../../../src/domain/student'
import { CreateStudentData, CreateStudentsUseCase } from '../../../../src/use-cases/student/create-student.use-case'

describe('Create Student Use Case', () => {
  let createStudentUseCase: CreateStudentsUseCase
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        CreateStudentsUseCase,
        {
          provide: STUDENT_REPOSITORY_KEY,
          useClass: StudentRepositoryMock
        }
      ]
    }).compile()

    createStudentUseCase = moduleRef.get<CreateStudentsUseCase>(CreateStudentsUseCase)
  })

  it('should throw exception if cpf is invalid', async () => {
    const createData: CreateStudentData = {
      name: 'test',
      email: 'test@test.com',
      cpf: '111'
    }
    await expect(createStudentUseCase.execute(createData)).rejects.toThrow(InvalidCpfException)
  })

  it('should return valid student on success', async () => {
    const createData: CreateStudentData = {
      name: 'test',
      email: 'test@test.com',
      cpf: '44422200012'
    }

    const student = await createStudentUseCase.execute(createData)
    expect(student.id).toBeDefined()
    expect(student.name).toEqual(createData.name)
    expect(student.email).toEqual(createData.email)
    expect(student.cpf).toEqual(createData.cpf)
    expect(student.class).toEqual(null)
  })
})
