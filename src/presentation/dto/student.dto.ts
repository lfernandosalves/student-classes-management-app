import { ClassDTO } from './class.dto'

export class StudentDTO {
  id: string
  name: string
  cpf: string
  email: string
  class: ClassDTO
}

export class CreateStudentDTO {
  name: string
  email: string
  cpf: string
}

export class UpdateStudentDTO {
  name: string
  email: string
  cpf: string
}
