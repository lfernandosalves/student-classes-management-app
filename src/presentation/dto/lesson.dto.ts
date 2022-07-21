import { ClassDTO } from './class.dto'
import { IsUrl, IsNotEmpty, IsDateString, IsString, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LessonDTO {
  id: string
  name: string
  date: Date
  class: ClassDTO
  meetingUrl: string
  topics: string
}

export class CreateLessonDTO {
  @ApiProperty()
  @IsNotEmpty()
    name: string

  @ApiProperty()
  @IsDateString()
    date: Date

  @ApiProperty()
  @IsUUID()
    classId: string

  @ApiProperty()
  @IsUrl()
    meetingUrl?: string

  @ApiProperty()
  @IsString()
    topics?: string
}

export class UpdateLessonDTO extends CreateLessonDTO {
  @ApiProperty()
  @IsUUID()
    id: string
}
