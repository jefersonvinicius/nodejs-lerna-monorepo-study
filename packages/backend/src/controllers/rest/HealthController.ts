import { Controller, Inject } from '@tsed/di';
import { HeaderParams } from '@tsed/platform-params';
import { Get } from '@tsed/schema';
import { DatabaseService } from 'src/services/database.js';

@Controller('/health')
export class HealthController {
  @Inject()
  private readonly databaseService: DatabaseService;

  @Get('/')
  async get(@HeaderParams('user-agent') userAgent: string) {
    const databaseIsHealth = await this.databaseService.checkHealth();
    return { date: new Date().toISOString(), userAgent, database: databaseIsHealth };
  }
}
