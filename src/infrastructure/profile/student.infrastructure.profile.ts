import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { Injectable } from '@nestjs/common'
import { Mapper, mapFrom, mapWith, createMap, forMember, MappingProfile } from '@automapper/core'
import { Student } from 'src/domain/student'
import { PrismaModel } from 'prisma/model'

@Injectable()
export class StudentInfrastructureProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper)
  }

  get profile (): MappingProfile {
    throw new Error('Method not implemented.')
  }

  mapProfile () {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        PrismaModel.Student,
        Student,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)))
    }
  }
}
