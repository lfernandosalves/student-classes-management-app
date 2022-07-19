import { Class } from './class'

export class Course {
  id: string
  name: string
  classes?: Class[]
}

export interface CourseRepository {
  listAll(): Promise<Course[]>
}

export const COURSE_REPOSITORY_KEY = 'courseRepositoryKey'
