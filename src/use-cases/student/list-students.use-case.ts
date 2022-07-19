import { Inject } from '@nestjs/common'
import { Student, StudentRepository, STUDENT_REPOSITORY_KEY } from '../../../src/domain/student'

export class ListStudentsUseCase {
  constructor (
    @Inject(STUDENT_REPOSITORY_KEY)
    private readonly studentRepository: StudentRepository
  ) {}

  async execute (): Promise<Student[]> {
    return this.studentRepository.listAll()
  }
}
