import { Controller } from '@tsed/di';
import { HeaderParams } from '@tsed/platform-params';
import { Get } from '@tsed/schema';

@Controller('/health')
export class HealthController {
  @Get('/')
  get(@HeaderParams('user-agent') userAgent: string) {
    return { date: new Date().toISOString(), userAgent };
  }
}
