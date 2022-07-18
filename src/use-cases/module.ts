import { Module } from '@nestjs/common'
import { InfrastructureModule } from 'src/infrastructure/module'
import { ListStudentsUseCase } from './student/list-students'

export const USE_CASE_LIST_STUDENTS = 'useCaseListStudents'

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: USE_CASE_LIST_STUDENTS,
      useClass: ListStudentsUseCase
    }
  ],
  exports: [
    USE_CASE_LIST_STUDENTS
  ]
})
export class UseCasesModule {}
