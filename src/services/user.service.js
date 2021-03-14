/* eslint-disable no-useless-catch */
import { BaseService } from './base.service';

export class UserService extends BaseService {
  static get entity() {
    return 'user';
  }

  static async addData(formData) {
    try {
      const response = await this.request({ auth: true }).post(
        this.entity,
        formData,
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
