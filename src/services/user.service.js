/* eslint-disable no-useless-catch */
import axiosService from './axios.service';

export class UserService {
  static get entity() {
    return 'user';
  }

  static async addData(formData) {
    try {
      const response = await axiosService.post(this.entity, formData);

      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
