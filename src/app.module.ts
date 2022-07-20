import { classes } from '@automapper/classes'
import { AutomapperModule } from '@automapper/nestjs'
import { Module } from '@nestjs/common'
import { InfrastructureModule } from './infrastructure/module'
import { PresentationModule } from './presentation/module'
import { UseCasesModule } from './use-cases/module'

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    }),
    InfrastructureModule,
    UseCasesModule,
    PresentationModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
