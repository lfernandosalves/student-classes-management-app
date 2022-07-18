import { StudentDTO } from './student.dto'

export class ClassDTO {
  id: string
  name: string
  startDate: Date
  endDate: Date
  students: StudentDTO[]
}
