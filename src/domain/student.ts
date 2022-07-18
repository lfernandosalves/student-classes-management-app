import { CreateStudentData } from 'src/use-cases/student/create-student.use-case'
import { UpdateStudentData } from 'src/use-cases/student/update-student.use-case'
import { Class } from './class'

export class Student {
  id: string
  name: string
  cpf: string
  email?: string
  classes: Class[]

  static isCpfValid (cpf: string): boolean {
    return true
  }
}

export interface StudentRepository {
  listAll(): Promise<Student[]>
  create(createData: CreateStudentData): Promise<Student>
  update(updateData: UpdateStudentData): Promise<Student>
  remove(id: string): Promise<boolean>
}

export const STUDENT_REPOSITORY_KEY = 'studentRepositoryKey'

export class InvalidCpfException extends Error {
  constructor () {
    const message = 'Invalid CPF value.'
    super(message)
  }
}
