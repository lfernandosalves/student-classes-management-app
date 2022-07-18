import { Module } from '@nestjs/common'
import { STUDENT_REPOSITORY_KEY } from 'src/domain/student'
import { PrismaService, PRISMA_SERVICE_KEY } from './common/prisma.service'
import { StudentInfrastructureProfile } from './profile/student.infrastructure.profile'
import { DatabaseStudentRepository } from './repository/database-student.repository'

@Module({
  imports: [],
  providers: [
    StudentInfrastructureProfile,
    {
      provide: PRISMA_SERVICE_KEY,
      useClass: PrismaService
    },
    {
      provide: STUDENT_REPOSITORY_KEY,
      useClass: DatabaseStudentRepository
    }
  ],
  exports: [
    PRISMA_SERVICE_KEY,
    STUDENT_REPOSITORY_KEY
  ]
})
export class InfrastructureModule {}
