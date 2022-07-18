import { Module } from '@nestjs/common'
import { InfrastructureModule } from 'src/infrastructure/module'
import { CreateStudentsUseCase } from './student/create-student.use-case'
import { ListStudentsUseCase } from './student/list-students.use-case'
import { RemoveStudentsUseCase } from './student/remove-student.use-case'
import { UpdateStudentsUseCase } from './student/update-student.use-case'

export const USE_CASE_LIST_STUDENTS = 'useCaseListStudents'
export const USE_CASE_CREATE_STUDENT = 'useCaseCreateStudent'
export const USE_CASE_UPDATE_STUDENT = 'useCaseUpdateStudent'
export const USE_CASE_REMOVE_STUDENT = 'useCaseRemoveStudent'

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: USE_CASE_LIST_STUDENTS,
      useClass: ListStudentsUseCase
    },
    {
      provide: USE_CASE_CREATE_STUDENT,
      useClass: CreateStudentsUseCase
    },
    {
      provide: USE_CASE_UPDATE_STUDENT,
      useClass: UpdateStudentsUseCase
    },
    {
      provide: USE_CASE_REMOVE_STUDENT,
      useClass: RemoveStudentsUseCase
    }
  ],
  exports: [
    USE_CASE_LIST_STUDENTS,
    USE_CASE_CREATE_STUDENT,
    USE_CASE_UPDATE_STUDENT,
    USE_CASE_REMOVE_STUDENT
  ]
})
export class UseCasesModule {}
