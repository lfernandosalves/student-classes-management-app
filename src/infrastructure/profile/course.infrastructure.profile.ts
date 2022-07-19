import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { Injectable } from '@nestjs/common'
import { Mapper, mapFrom, mapWith, createMap, forMember } from '@automapper/core'
import { PrismaModel } from 'prisma/model'
import { Class } from 'src/domain/class'
import { Course } from 'src/domain/course'
import { CourseDTO } from 'src/presentation/dto/course.dto'

@Injectable()
export class CourseInfrastructureProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper)
  }

  get profile () {
    return (mapper: Mapper) => {
      // prismaModel -> domain
      createMap(
        mapper,
        PrismaModel.Course,
        Course,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)),
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name)),
        forMember(
          (destination) => destination.classes,
          mapWith(Class, PrismaModel.Class, (source) => source.classes || []))
      )

      // domain -> dto
      createMap(
        mapper,
        Course,
        CourseDTO,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)),
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name))
      )
    }
  }
}
