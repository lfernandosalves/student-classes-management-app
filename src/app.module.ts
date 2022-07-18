import { classes } from '@automapper/classes'
import { AutomapperModule } from '@automapper/nestjs'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
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
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
