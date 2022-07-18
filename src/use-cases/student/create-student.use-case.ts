import { Inject } from '@nestjs/common'
import { InvalidCpfException, Student, StudentRepository, STUDENT_REPOSITORY_KEY } from 'src/domain/student'

export type CreateStudentData = {
  name: string
  cpf: string
  email: string
}

export class CreateStudentsUseCase {
  constructor (
    @Inject(STUDENT_REPOSITORY_KEY)
    private readonly studentRepository: StudentRepository
  ) {}

  async execute (createData: CreateStudentData): Promise<Student> {
    if (!Student.isCpfValid(createData.cpf)) {
      throw new InvalidCpfException()
    }

    return this.studentRepository.create(createData)
  }
}
