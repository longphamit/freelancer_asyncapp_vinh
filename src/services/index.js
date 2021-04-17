import ApiClient from './api';
import Socket from './socket';

export default class Service {
  static api = new ApiClient();
  static socket = new Socket();
}
