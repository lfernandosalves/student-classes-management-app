import { Inject } from '@nestjs/common'
import { Class, ClassRepository, CLASS_REPOSITORY_KEY } from '../../../src/domain/class'

export class ListClassesUseCase {
  constructor (
    @Inject(CLASS_REPOSITORY_KEY)
    private readonly classRepository: ClassRepository
  ) {}

  async execute (): Promise<Class[]> {
    return this.classRepository.listAll()
  }
}
