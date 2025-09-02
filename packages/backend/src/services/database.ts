import { Service } from '@tsed/di';
import { Client } from 'pg';

@Service()
export class DatabaseService {
  private _client: Client | null = null;

  async checkHealth() {
    const client = await this.getClient();
    const response = await client.query('SELECT $1::text as message', ['Hello world!']);
    return response.rows[0].message === 'Hello world!';
  }

  private async getClient() {
    if (!this._client) {
      this._client = new Client({
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USERNAME,
      });
      await this._client.connect();
    }

    return this._client;
  }
}
