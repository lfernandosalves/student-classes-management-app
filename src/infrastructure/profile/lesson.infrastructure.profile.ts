import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { Injectable } from '@nestjs/common'
import { Mapper, mapFrom, mapWith, createMap, forMember } from '@automapper/core'
import { PrismaModel } from 'prisma/model'
import { Class } from 'src/domain/class'
import { ClassDTO } from 'src/presentation/dto/class.dto'
import { Lesson } from 'src/domain/lesson'
import { LessonDTO } from 'src/presentation/dto/lesson.dto'

@Injectable()
export class LessonInfrastructureProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper)
  }

  get profile () {
    return (mapper: Mapper) => {
      // prismaModel -> domain
      createMap(
        mapper,
        PrismaModel.Lesson,
        Lesson,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)),
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name)),
        forMember(
          (destination) => destination.date,
          mapFrom((source) => source.date)),
        forMember(
          (destination) => destination.meetingUrl,
          mapFrom((source) => source.meetingUrl)),
        forMember(
          (destination) => destination.topics,
          mapFrom((source) => source.topics)),
        forMember(
          (destination) => destination.class,
          mapWith(Class, PrismaModel.Class, (source) => source.class))

      )

      // domain -> dto
      createMap(
        mapper,
        Lesson,
        LessonDTO,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)),
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name)),
        forMember(
          (destination) => destination.date,
          mapFrom((source) => source.date)),
        forMember(
          (destination) => destination.meetingUrl,
          mapFrom((source) => source.meetingUrl)),
        forMember(
          (destination) => destination.topics,
          mapFrom((source) => source.topics)),
        forMember(
          (destination) => destination.class,
          mapWith(ClassDTO, Class, (source) => source.class))

      )
    }
  }
}
