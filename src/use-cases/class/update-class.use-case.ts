import { Inject } from '@nestjs/common'
import { Class, ClassRepository, CLASS_REPOSITORY_KEY, InvalidClassDatesException } from '../../../src/domain/class'

export type UpdateClassData = {
  id: string
  name: string
  courseId: string
  startDate: Date
  endDate: Date
}

export class UpdateClassUseCase {
  constructor (
    @Inject(CLASS_REPOSITORY_KEY)
    private readonly classRepository: ClassRepository
  ) {}

  async execute (updateData: UpdateClassData): Promise<Class> {
    if (!Class.isDateValid(updateData.startDate, updateData.endDate)) {
      throw new InvalidClassDatesException()
    }

    return this.classRepository.update(updateData)
  }
}
