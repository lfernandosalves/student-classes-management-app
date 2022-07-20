import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('health check')
export class HealthCheckController {
  @Get()
  @ApiResponse({
    description: 'Check if API is online.',
    type: String
  })
  healthCheck (): string {
    return 'App online!'
  }
}
