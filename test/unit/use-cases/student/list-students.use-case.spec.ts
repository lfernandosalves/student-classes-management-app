import { Test } from '@nestjs/testing'
import { StudentRepositoryMock } from '../../../../test/unit/mockery/student.mock'
import { STUDENT_REPOSITORY_KEY } from '../../../../src/domain/student'
import { ListStudentsUseCase } from '../../../../src/use-cases/student/list-students.use-case'

describe('List Students Use Case', () => {
  let listStudentsUseCase: ListStudentsUseCase
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        ListStudentsUseCase,
        {
          provide: STUDENT_REPOSITORY_KEY,
          useClass: StudentRepositoryMock
        }
      ]
    }).compile()

    listStudentsUseCase = moduleRef.get<ListStudentsUseCase>(ListStudentsUseCase)
  })

  it('should return valid list of students', async () => {
    const students = await listStudentsUseCase.execute()
    expect(students.length).toBe(1)
    expect(students[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      cpf: expect.any(String),
      email: expect.any(String),
      class: null
    })
  })
})
