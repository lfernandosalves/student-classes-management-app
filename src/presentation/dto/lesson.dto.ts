import { ClassDTO } from './class.dto'

export class LessonDTO {
  id: string
  name: string
  date: Date
  class: ClassDTO
  meetingUrl: string
  topics: string
}

export class CreateLessonDTO {
  name: string
  date: Date
  classId: string
  meetingUrl?: string
  topics?: string
}

export type UpdateLessonDTO = CreateLessonDTO & { id: string }
