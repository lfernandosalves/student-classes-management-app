import { CourseDTO } from './course.dto'
import { StudentDTO } from './student.dto'
import { IsNotEmpty, IsDateString, IsUUID } from 'class-validator'

export class ClassDTO {
  id: string
  name: string
  startDate: Date
  endDate: Date
  students: StudentDTO[]
  course: CourseDTO
}

export class CreateClassDTO {
  @IsNotEmpty()
    name: string

  @IsDateString()
    startDate: Date

  @IsDateString()
    endDate: Date

  @IsUUID()
    courseId: string
}

export class UpdateClassDTO extends CreateClassDTO {
  @IsUUID()
    id: string
}

export class EnrollStudentInClassDTO {
  @IsUUID()
    studentId: string

  @IsUUID()
    classId: string
}
