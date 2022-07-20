import { CourseDTO } from './course.dto'
import { StudentDTO } from './student.dto'

export class ClassDTO {
  id: string
  name: string
  startDate: Date
  endDate: Date
  students: StudentDTO[]
  course: CourseDTO
}

export class CreateClassDTO {
  name: string
  startDate: Date
  endDate: Date
  courseId: string
}

export type UpdateClassDTO = CreateClassDTO & { id: string }

export class EnrollStudentInClassDTO {
  studentId: string
  classId: string
}
