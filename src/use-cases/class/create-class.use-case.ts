import { Inject } from '@nestjs/common'
import { Class, ClassRepository, CLASS_REPOSITORY_KEY, InvalidClassDatesException } from '../../../src/domain/class'

export type CreateClassData = {
  name: string
  courseId: string
  startDate: Date
  endDate: Date
}

export class CreateClassUseCase {
  constructor (
    @Inject(CLASS_REPOSITORY_KEY)
    private readonly classRepository: ClassRepository
  ) {}

  async execute (createData: CreateClassData): Promise<Class> {
    if (!Class.isDateValid(createData.startDate, createData.endDate)) {
      throw new InvalidClassDatesException()
    }

    return this.classRepository.create(createData)
  }
}
