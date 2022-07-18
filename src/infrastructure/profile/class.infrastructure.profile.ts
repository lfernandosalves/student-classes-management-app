import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { Injectable } from '@nestjs/common'
import { Mapper, mapFrom, mapWith, createMap, forMember } from '@automapper/core'
import { Student } from 'src/domain/student'
import { PrismaModel } from 'prisma/model'
import { Class } from 'src/domain/class'
import { StudentDTO } from 'src/presentation/dto/student.dto'
import { ClassDTO } from 'src/presentation/dto/class.dto'
import { Course } from 'src/domain/course'
import { Lesson } from 'src/domain/lesson'

@Injectable()
export class ClassInfrastructureProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper)
  }

  get profile () {
    return (mapper: Mapper) => {
      // prismaModel -> domain
      createMap(
        mapper,
        PrismaModel.Class,
        Class,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)),
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name)),
        forMember(
          (destination) => destination.startDate,
          mapFrom((source) => source.startDate)),
        forMember(
          (destination) => destination.endDate,
          mapFrom((source) => source.endDate)),
        forMember(
          (destination) => destination.course,
          mapWith(Course, PrismaModel.Course, (source) => source.course)),
        forMember(
          (destination) => destination.lessons,
          mapWith(Lesson, PrismaModel.Lesson, (source) => source.lessons || [])),
        forMember(
          (destination) => destination.students,
          mapWith(Student, PrismaModel.Student, (source) => source.students || []))

      )

      // domain -> dto
      createMap(
        mapper,
        Class,
        ClassDTO,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)),
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name)),
        forMember(
          (destination) => destination.startDate,
          mapFrom((source) => source.startDate)),
        forMember(
          (destination) => destination.endDate,
          mapFrom((source) => source.endDate)),
        // forMember(
        //   (destination) => destination.course,
        //   mapWith(Course, PrismaModel.Course, (source) => source.course)),
        // forMember(
        //   (destination) => destination.lessons,
        //   mapWith(Lesson, PrismaModel.Lesson, (source) => source.lessons || [])),
        forMember(
          (destination) => destination.students,
          mapWith(StudentDTO, Student, (source) => source.students || []))

      )
    }
  }
}
