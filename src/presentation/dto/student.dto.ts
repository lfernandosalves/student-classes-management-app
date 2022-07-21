import { ClassDTO } from './class.dto'
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class StudentDTO {
  id: string
  name: string
  cpf: string
  email: string
  class: ClassDTO
}

export class CreateStudentDTO {
  @ApiProperty()
  @IsNotEmpty()
    name: string

  @ApiProperty()
  @IsEmail()
    email: string

  @ApiProperty()
    cpf: string
}

export class UpdateStudentDTO extends CreateStudentDTO {
  id: string
}
