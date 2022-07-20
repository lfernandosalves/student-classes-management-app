import { CreateClassData } from 'src/use-cases/class/create-class.use-case'
import { UpdateClassData } from 'src/use-cases/class/update-class.use-case'
import { Course } from './course'
import { Lesson } from './lesson'
import { Student } from './student'

export class Class {
  id: string
  name: string
  startDate: Date
  endDate: Date
  course?: Course
  lessons: Lesson[]
  students: Student[]

  static isDateValid (startDate: Date, endDate: Date) {
    return endDate && startDate && endDate > startDate
  }
}

export interface ClassRepository {
  listAll(): Promise<Class[]>
  create(createData: CreateClassData): Promise<Class>
  update(updateData: UpdateClassData): Promise<Class>
  remove(id: string): Promise<boolean>
  enrollStudentToClass(studentId: string, classId: string): Promise<boolean>
  getClassesByDates(startDate: Date, endDate: Date): Promise<Class[]>
}

export const CLASS_REPOSITORY_KEY = 'classRepositoryKey'

export class InvalidClassDatesException extends Error {
  constructor () {
    const message = 'Invalid dates, end date must be greater than start date.'
    super(message)
  }
}

export class ClassDateNotAvailableException extends Error {
  constructor () {
    const message = 'Invalid dates, there is already a class within this time.'
    super(message)
  }
}
