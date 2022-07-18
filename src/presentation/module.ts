import { Module } from '@nestjs/common'
import { UseCasesModule } from 'src/use-cases/module'
import { StudentController } from './controllers/student.controller'

@Module({
  imports: [UseCasesModule],
  providers: [
  ],
  exports: [
  ],
  controllers: [StudentController]
})
export class PresentationModule {}
