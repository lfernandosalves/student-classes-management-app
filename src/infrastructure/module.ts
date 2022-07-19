import { Module } from '@nestjs/common'
import { CLASS_REPOSITORY_KEY } from 'src/domain/class'
import { COURSE_REPOSITORY_KEY } from 'src/domain/course'
import { LESSON_REPOSITORY_KEY } from 'src/domain/lesson'
import { STUDENT_REPOSITORY_KEY } from 'src/domain/student'
import { PrismaService, PRISMA_SERVICE_KEY } from './common/prisma.service'
import { ClassInfrastructureProfile } from './profile/class.infrastructure.profile'
import { CourseInfrastructureProfile } from './profile/course.infrastructure.profile'
import { LessonInfrastructureProfile } from './profile/lesson.infrastructure.profile'
import { StudentInfrastructureProfile } from './profile/student.infrastructure.profile'
import { DatabaseClassRepository } from './repository/database-class.repository'
import { DatabaseCourseRepository } from './repository/database-course.repository'
import { DatabaseLessonRepository } from './repository/database-lesson.repository'
import { DatabaseStudentRepository } from './repository/database-student.repository'

@Module({
  imports: [],
  providers: [
    LessonInfrastructureProfile,
    CourseInfrastructureProfile,
    StudentInfrastructureProfile,
    ClassInfrastructureProfile,
    {
      provide: PRISMA_SERVICE_KEY,
      useClass: PrismaService
    },
    {
      provide: STUDENT_REPOSITORY_KEY,
      useClass: DatabaseStudentRepository
    },
    {
      provide: COURSE_REPOSITORY_KEY,
      useClass: DatabaseCourseRepository
    },
    {
      provide: LESSON_REPOSITORY_KEY,
      useClass: DatabaseLessonRepository
    },
    {
      provide: CLASS_REPOSITORY_KEY,
      useClass: DatabaseClassRepository
    }
  ],
  exports: [
    PRISMA_SERVICE_KEY,
    STUDENT_REPOSITORY_KEY,
    COURSE_REPOSITORY_KEY,
    LESSON_REPOSITORY_KEY,
    CLASS_REPOSITORY_KEY
  ]
})
export class InfrastructureModule {}
