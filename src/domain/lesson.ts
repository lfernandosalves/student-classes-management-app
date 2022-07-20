import { CreateLessonData } from 'src/use-cases/lesson/create-lesson.use-case'
import { UpdateLessonData } from 'src/use-cases/lesson/update-lesson.use-case'
import { Class } from './class'

export class Lesson {
  id: string
  name: string
  class: Class
  date: Date
  meetingUrl?: string
  topics?: string
}

export interface LessonRepository {
  listAll(): Promise<Lesson[]>
  create(createData: CreateLessonData): Promise<Lesson>
  update(updateData: UpdateLessonData): Promise<Lesson>
  remove(id: string): Promise<boolean>
  getLessonOnDay(date: Date, classId: string): Promise<Lesson>
}

export const LESSON_REPOSITORY_KEY = 'lessonRepositoryKey'

export class InvalidLessonDayException extends Error {
  constructor () {
    const message = 'Invalid date, there is already a lesson created on this day.'
    super(message)
  }
}

export class InvalidLessonDateConflictException extends Error {
  constructor () {
    const message = 'Invalid date, there is already a lesson scheduled for this date.'
    super(message)
  }
}

export class InvalidLessonClassDateConflictException extends Error {
  constructor () {
    const message = 'Invalid date, it must be scheduled within the class scheduling range.'
    super(message)
  }
}
