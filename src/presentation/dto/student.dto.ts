import { ClassDTO } from './class.dto'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class StudentDTO {
  id: string
  name: string
  cpf: string
  email: string
  class: ClassDTO
}

export class CreateStudentDTO {
  @IsNotEmpty()
    name: string

  @IsEmail()
    email: string

  cpf: string
}

export class UpdateStudentDTO {
  @IsNotEmpty()
    name: string

  @IsEmail()
    email: string

  cpf: string
}
