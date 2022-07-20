import { Inject } from '@nestjs/common'
import { AlreadyEnrolledException, StudentRepository, STUDENT_REPOSITORY_KEY } from '../../../src/domain/student'
import { ClassRepository, CLASS_REPOSITORY_KEY } from '../../domain/class'

export class EnrollStudentInClassUseCase {
  constructor (
    @Inject(CLASS_REPOSITORY_KEY)
    private readonly classRepository: ClassRepository,
    @Inject(STUDENT_REPOSITORY_KEY)
    private readonly studentRepository: StudentRepository
  ) {}

  async execute (studentId: string, classId: string): Promise<boolean> {
    const studentClass = await this.studentRepository.getClass(studentId)
    if (studentClass) {
      throw new AlreadyEnrolledException()
    }

    await this.classRepository.enrollStudentToClass(studentId, classId)
    return true
  }
}
