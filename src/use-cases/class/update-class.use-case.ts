import { Inject } from '@nestjs/common'
import { Class, ClassDateNotAvailableException, ClassRepository, CLASS_REPOSITORY_KEY, InvalidClassDatesException } from '../../../src/domain/class'

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
    const { startDate, endDate, id } = updateData

    if (!Class.isDateValid(startDate, endDate)) {
      throw new InvalidClassDatesException()
    }

    if (!await this.isDateAvailable(startDate, endDate, id)) {
      throw new ClassDateNotAvailableException()
    }

    return this.classRepository.update(updateData)
  }

  async isDateAvailable (startDate: Date, endDate: Date, classId: string): Promise<boolean> {
    const classesInInterval = await this.classRepository.getClassesByDates(startDate, endDate)
    return (classesInInterval.filter((_class) => _class.id !== classId)).length === 0
  }
}
