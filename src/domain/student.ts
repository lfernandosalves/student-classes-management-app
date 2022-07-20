import { CreateStudentData } from 'src/use-cases/student/create-student.use-case'
import { UpdateStudentData } from 'src/use-cases/student/update-student.use-case'
import { Class } from './class'

export class Student {
  id: string
  name: string
  cpf: string
  email?: string
  class?: Class

  static isCpfValid (cpf: string): boolean {
    const onlyNumbersCpf = cpf.replace(/\./g, '').replace(/-/g, '')
    const checkRegex = /\d{11}/ // basic format check, just for demonstration
    return onlyNumbersCpf.length === 11 && checkRegex.test(onlyNumbersCpf)
  }
}

export interface StudentRepository {
  listAll(): Promise<Student[]>
  create(createData: CreateStudentData): Promise<Student>
  update(updateData: UpdateStudentData): Promise<Student>
  remove(id: string): Promise<boolean>
  getClass(id: string): Promise<Class | null>
}

export const STUDENT_REPOSITORY_KEY = 'studentRepositoryKey'

export class InvalidCpfException extends Error {
  constructor () {
    const message = 'Invalid CPF value.'
    super(message)
  }
}

export class AlreadyEnrolledException extends Error {
  constructor () {
    const message = 'Student is already enrolled in another class.'
    super(message)
  }
}
