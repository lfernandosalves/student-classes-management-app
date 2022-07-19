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
}

export const LESSON_REPOSITORY_KEY = 'lessonRepositoryKey'
