import { Inject } from '@nestjs/common'
import { ClassRepository, CLASS_REPOSITORY_KEY } from '../../../src/domain/class'

export class RemoveClassUseCase {
  constructor (
    @Inject(CLASS_REPOSITORY_KEY)
    private readonly classRepository: ClassRepository
  ) {}

  async execute (id: string): Promise<boolean> {
    return this.classRepository.remove(id)
  }
}
