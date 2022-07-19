import { Class, ClassRepository } from 'src/domain/class'
import { CreateClassData } from 'src/use-cases/class/create-class.use-case'
import { UpdateClassData } from 'src/use-cases/class/update-class.use-case'
import { generateMockName, generateMockUuid } from './util.mock'

function generateClass (): Class {
  return {
    id: generateMockUuid(),
    name: generateMockName(),
    startDate: new Date('2022-01-01'),
    endDate: new Date('2022-12-31'),
    course: null,
    lessons: [],
    students: []
  }
}

export class ClassRepositoryMock implements ClassRepository {
  async listAll (): Promise<Class[]> {
    return [generateClass()]
  }

  async update (updateData: UpdateClassData): Promise<Class> {
    return {
      ...updateData,
      course: null,
      lessons: [],
      students: []
    }
  }

  async remove (id: string): Promise<boolean> {
    return true
  }

  async create (createData: CreateClassData): Promise<Class> {
    const { name, startDate, endDate } = createData
    return {
      id: generateMockUuid(),
      name,
      startDate,
      endDate,
      course: null,
      lessons: [],
      students: []
    }
  }
}
