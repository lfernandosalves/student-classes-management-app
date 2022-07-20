import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

export const PRISMA_SERVICE_KEY = 'PRISMA_SERVICE_KEY'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor () {
    super({
      log: ['query']
    })
  }

  async onModuleInit () {
    await this.$connect()
  }

  async enableShutdownHooks (app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
