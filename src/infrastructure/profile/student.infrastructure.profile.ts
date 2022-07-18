import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { Injectable } from '@nestjs/common'
import { Mapper, mapFrom, mapWith, createMap, forMember, MappingProfile } from '@automapper/core'
import { Student } from 'src/domain/student'
import { PrismaModel } from 'prisma/model'
import { Class } from 'src/domain/class'
import { StudentDTO } from 'src/presentation/dto/student.dto'
import { ClassDTO } from 'src/presentation/dto/class.dto'

@Injectable()
export class StudentInfrastructureProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper)
  }

  get profile () {
    return (mapper: Mapper) => {
      // prismaModel -> domain
      createMap(
        mapper,
        PrismaModel.Student,
        Student,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)),
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name)),
        forMember(
          (destination) => destination.cpf,
          mapFrom((source) => source.cpf)),
        forMember(
          (destination) => destination.email,
          mapFrom((source) => source.email)),
        forMember(
          (destination) => destination.classes,
          mapWith(Class, PrismaModel.Class, (source) => source.classes || []))

      )

      // domain -> dto
      createMap(
        mapper,
        Student,
        StudentDTO,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)),
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name)),
        forMember(
          (destination) => destination.cpf,
          mapFrom((source) => source.cpf)),
        forMember(
          (destination) => destination.email,
          mapFrom((source) => source.email)),
        forMember(
          (destination) => destination.classes,
          mapWith(ClassDTO, Class, (source) => source.classes || []))

      )
    }
  }
}
