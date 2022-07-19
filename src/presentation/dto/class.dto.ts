import { StudentDTO } from './student.dto'

export class ClassDTO {
  id: string
  name: string
  startDate: Date
  endDate: Date
  students: StudentDTO[]
}

export class CreateClassDTO {
  name: string
  startDate: Date
  endDate: Date
  courseId: string
}

export type UpdateClassDTO = CreateClassDTO & { id: string }
