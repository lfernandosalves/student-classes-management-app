import { Inject } from '@nestjs/common'
import { StudentRepository, STUDENT_REPOSITORY_KEY } from 'src/domain/student'

export class RemoveStudentsUseCase {
  constructor (
    @Inject(STUDENT_REPOSITORY_KEY)
    private readonly studentRepository: StudentRepository
  ) {}

  async execute (id: string): Promise<boolean> {
    return this.studentRepository.remove(id)
  }
}
