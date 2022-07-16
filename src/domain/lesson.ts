import { Class } from './class'

export class Lesson {
  id: string
  name: string
  class: Class
  date: Date
  meetingUrl?: string
  topics?: string
}
