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
}
