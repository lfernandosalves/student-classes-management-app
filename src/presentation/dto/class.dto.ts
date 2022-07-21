import { CourseDTO } from './course.dto'
import { StudentDTO } from './student.dto'
import { IsNotEmpty, IsDateString, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ClassDTO {
  @ApiProperty()
    id: string

  @ApiProperty()
    name: string

  @ApiProperty()
    startDate: Date

  @ApiProperty()
    endDate: Date

  @ApiProperty()
    students: StudentDTO[]

  @ApiProperty()
    course: CourseDTO
}

export class CreateClassDTO {
  @ApiProperty()
  @IsNotEmpty()
    name: string

  @ApiProperty()
  @IsDateString()
    startDate: Date

  @ApiProperty()
  @IsDateString()
    endDate: Date

  @ApiProperty()
  @IsUUID()
    courseId: string
}

export class UpdateClassDTO extends CreateClassDTO {
  id: string
}

export class EnrollStudentInClassDTO {
  @ApiProperty()
  @IsUUID()
    studentId: string

  @ApiProperty()
  @IsUUID()
    classId: string
}
