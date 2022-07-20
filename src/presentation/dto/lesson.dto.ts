import { ClassDTO } from './class.dto'
import { IsUrl, IsNotEmpty, IsDateString, IsString, IsUUID } from 'class-validator'

export class LessonDTO {
  id: string
  name: string
  date: Date
  class: ClassDTO
  meetingUrl: string
  topics: string
}

export class CreateLessonDTO {
  @IsNotEmpty()
    name: string

  @IsDateString()
    date: Date

  @IsUUID()
    classId: string

  @IsUrl()
    meetingUrl?: string

  @IsString()
    topics?: string
}

export class UpdateLessonDTO extends CreateLessonDTO {
  @IsUUID()
    id: string
}
