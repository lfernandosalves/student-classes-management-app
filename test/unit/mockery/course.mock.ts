import { Course, CourseRepository } from 'src/domain/course'
import { generateMockName, generateMockUuid } from './util.mock'

export function generateCourse (): Course {
  return {
    id: generateMockUuid(),
    name: generateMockName()
  }
}

export class CourseRepositoryMock implements CourseRepository {
  async listAll (): Promise<Course[]> {
    return [generateCourse()]
  }
}
