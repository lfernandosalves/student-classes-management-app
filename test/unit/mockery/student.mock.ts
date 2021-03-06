import { Class } from 'src/domain/class'
import { Student, StudentRepository } from 'src/domain/student'
import { CreateStudentData } from 'src/use-cases/student/create-student.use-case'
import { UpdateStudentData } from 'src/use-cases/student/update-student.use-case'
import { generateClass } from './class.mock'
import { generateMockEmail, generateMockName, generateMockUuid } from './util.mock'

function generateStudent (): Student {
  return {
    id: generateMockUuid(),
    name: generateMockName(),
    email: generateMockEmail(),
    cpf: '44422211100',
    class: null
  }
}

export class StudentRepositoryMock implements StudentRepository {
  async getClass (id: string): Promise<Class> {
    return generateClass()
  }

  async update (updateData: UpdateStudentData): Promise<Student> {
    return {
      ...updateData,
      class: null
    }
  }

  async remove (id: string): Promise<boolean> {
    return true
  }

  async listAll (): Promise<Student[]> {
    return [generateStudent()]
  }

  async create (createData: CreateStudentData): Promise<Student> {
    const { name, email, cpf } = createData
    return {
      id: generateMockUuid(),
      name,
      email,
      cpf,
      class: null
    }
  }
}
