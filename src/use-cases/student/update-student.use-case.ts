import { Inject } from '@nestjs/common'
import { Student, StudentRepository, STUDENT_REPOSITORY_KEY } from 'src/domain/student'

export type UpdateStudentData = {
  id: string
  name: string
  cpf: string
  email: string
}

export class UpdateStudentsUseCase {
  constructor (
    @Inject(STUDENT_REPOSITORY_KEY)
    private readonly studentRepository: StudentRepository
  ) {}

  async execute (updateData: UpdateStudentData): Promise<Student> {
    return this.studentRepository.update(updateData)
  }
}
