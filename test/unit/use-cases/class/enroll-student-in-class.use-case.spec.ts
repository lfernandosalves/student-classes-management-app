import { Test } from '@nestjs/testing'
import { ClassRepositoryMock } from '../../../../test/unit/mockery/class.mock'
import { Class, CLASS_REPOSITORY_KEY } from '../../../../src/domain/class'
import { EnrollStudentInClassUseCase } from '../../../../src/use-cases/class/enroll-student-in-class.use-case'
import { StudentRepositoryMock } from '../../../../test/unit/mockery/student.mock'
import { AlreadyEnrolledException, STUDENT_REPOSITORY_KEY } from '../../../../src/domain/student'

describe('Enroll Student in Class Use Case', () => {
  let enrollStudentInClassUseCase: EnrollStudentInClassUseCase
  let studentRepositoryMock: StudentRepositoryMock
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        EnrollStudentInClassUseCase,
        {
          provide: CLASS_REPOSITORY_KEY,
          useClass: ClassRepositoryMock
        },
        {
          provide: STUDENT_REPOSITORY_KEY,
          useClass: StudentRepositoryMock
        }
      ]
    }).compile()

    enrollStudentInClassUseCase = moduleRef.get<EnrollStudentInClassUseCase>(EnrollStudentInClassUseCase)
    studentRepositoryMock = moduleRef.get<StudentRepositoryMock>(STUDENT_REPOSITORY_KEY)
  })

  it('should throw exception if student is already enrolled in another class', async () => {
    await expect(enrollStudentInClassUseCase.execute('123-student', '123-class')).rejects.toThrow(AlreadyEnrolledException)
  })

  it('should successfully enroll student in class', async () => {
    jest.spyOn(studentRepositoryMock, 'getClass').mockResolvedValue(null)
    const result = await enrollStudentInClassUseCase.execute('123-student', '123-class')
    expect(result).toBe(true)
  })
})
