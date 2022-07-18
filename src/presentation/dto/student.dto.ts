import { ClassDTO } from './class.dto'

export class StudentDTO {
  id: string
  name: string
  cpf: string
  email: string
  classes: ClassDTO[]
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
