import { Class } from '../../../src/domain/class'
import { Lesson, LessonRepository } from '../../../src/domain/lesson'
import { CreateLessonData } from '../../../src/use-cases/lesson/create-lesson.use-case'
import { UpdateLessonData } from '../../../src/use-cases/lesson/update-lesson.use-case'
import { generateMockName, generateMockUuid } from './util.mock'

export function generateLessonMock (): Lesson {
  return {
    id: generateMockUuid(),
    name: generateMockName(),
    class: null,
    date: new Date()
  }
}

export class LessonRepositoryMock implements LessonRepository {
  async listAll (): Promise<Lesson[]> {
    return [generateLessonMock()]
  }

  async create (createData: CreateLessonData): Promise<Lesson> {
    return {
      id: generateMockUuid(),
      name: createData.name,
      meetingUrl: createData.meetingUrl,
      date: createData.date,
      class: new Class()
    }
  }

  async update (updateData: UpdateLessonData): Promise<Lesson> {
    return {
      id: updateData.id,
      name: updateData.name,
      meetingUrl: updateData.meetingUrl,
      date: updateData.date,
      class: new Class()
    }
  }

  async remove (id: string): Promise<boolean> {
    return true
  }

  async getLessonOnDay (date: Date, classId: string): Promise<Lesson> {
    return generateLessonMock()
  }
}
