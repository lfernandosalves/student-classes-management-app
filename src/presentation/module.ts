import { Module } from '@nestjs/common'
import { UseCasesModule } from 'src/use-cases/module'
import { ClassController } from './controllers/class.controller'
import { CourseController } from './controllers/course.controller'
import { LessonController } from './controllers/lesson.controller'
import { StudentController } from './controllers/student.controller'

@Module({
  imports: [UseCasesModule],
  providers: [],
  exports: [],
  controllers: [ClassController, LessonController, CourseController, StudentController]
})
export class PresentationModule {}
