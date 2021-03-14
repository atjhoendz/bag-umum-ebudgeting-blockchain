/* eslint-disable no-useless-catch */
import { BaseService } from './base.service';

export class LembagaService extends BaseService {
  static get entity() {
    return 'lembaga';
  }

  static async getAll() {
    try {
      const response = await this.request({ auth: true }).get(this.entity);

      return response.data.data;
    } catch (err) {
      throw err;
    }
  }
}
