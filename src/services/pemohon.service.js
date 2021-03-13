/* eslint-disable no-useless-catch */
import { BaseService } from './base.service';

export class PemohonService extends BaseService {
  static get entity() {
    return 'pemohon';
  }

  static async getAll() {
    try {
      const response = await this.request({ auth: true }).get(this.entity);

      return response.data.data;
    } catch (err) {
      throw err;
    }
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

  static async get(key) {
    try {
      const response = await this.request({ auth: true }).get(
        `${this.entity}/${key}`,
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async update(key, formData) {
    try {
      const response = await this.request({ auth: true }).put(
        `${this.entity}/${key}`,
        formData,
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async delete(key) {
    try {
      const response = await this.request({ auth: true }).delete(
        `${this.entity}/${key}`,
      );

      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }
}
