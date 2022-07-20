import { Inject } from '@nestjs/common'
import { Class, ClassDateNotAvailableException, ClassRepository, CLASS_REPOSITORY_KEY, InvalidClassDatesException } from '../../../src/domain/class'

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
    const { startDate, endDate } = createData

    if (!Class.isDateValid(startDate, endDate)) {
      throw new InvalidClassDatesException()
    }

    if (!await this.isDateAvailable(startDate, endDate)) {
      throw new ClassDateNotAvailableException()
    }

    return this.classRepository.create(createData)
  }

  async isDateAvailable (startDate: Date, endDate: Date): Promise<boolean> {
    const classesInInterval = await this.classRepository.getClassesByDates(startDate, endDate)
    return classesInInterval.length === 0
  }
}
