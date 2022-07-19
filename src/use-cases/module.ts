import { Module } from '@nestjs/common'
import { InfrastructureModule } from 'src/infrastructure/module'
import { CreateClassUseCase } from './class/create-class.use-case'
import { ListClassesUseCase } from './class/list-classes.use-case'
import { UpdateClassUseCase } from './class/update-class.use-case'
import { ListCoursesUseCase } from './course/list-courses.use-case'
import { CreateStudentsUseCase } from './student/create-student.use-case'
import { ListStudentsUseCase } from './student/list-students.use-case'
import { RemoveStudentsUseCase } from './student/remove-student.use-case'
import { UpdateStudentsUseCase } from './student/update-student.use-case'

export const USE_CASE_LIST_STUDENTS = 'useCaseListStudents'
export const USE_CASE_CREATE_STUDENT = 'useCaseCreateStudent'
export const USE_CASE_UPDATE_STUDENT = 'useCaseUpdateStudent'
export const USE_CASE_REMOVE_STUDENT = 'useCaseRemoveStudent'

export const USE_CASE_LIST_COURSES = 'useCaseListCourses'

export const USE_CASE_LIST_CLASSES = 'useCaseListClasses'
export const USE_CASE_CREATE_CLASS = 'useCaseCreateClass'
export const USE_CASE_UPDATE_CLASS = 'useCaseUpdateClass'
export const USE_CASE_REMOVE_CLASS = 'useCaseRemoveClass'

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
    },
    {
      provide: USE_CASE_LIST_COURSES,
      useClass: ListCoursesUseCase
    },
    {
      provide: USE_CASE_LIST_CLASSES,
      useClass: ListClassesUseCase
    },
    {
      provide: USE_CASE_CREATE_CLASS,
      useClass: CreateClassUseCase
    },
    {
      provide: USE_CASE_UPDATE_CLASS,
      useClass: UpdateClassUseCase
    }
    // {
    //   provide: USE_CASE_REMOVE_CLASS,
    //   useClass: RemoveClassUseCase
    // },
  ],
  exports: [
    USE_CASE_LIST_STUDENTS,
    USE_CASE_CREATE_STUDENT,
    USE_CASE_UPDATE_STUDENT,
    USE_CASE_REMOVE_STUDENT,
    USE_CASE_LIST_COURSES,
    USE_CASE_LIST_CLASSES,
    USE_CASE_CREATE_CLASS,
    USE_CASE_UPDATE_CLASS,
    USE_CASE_REMOVE_CLASS
  ]
})
export class UseCasesModule {}
