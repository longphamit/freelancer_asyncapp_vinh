export default class User {
  constructor() {
    this._id = '';
    this.email = '';
    this.password = '';
    this.name = '';
    this.token = '';
    this.refreshToken = '';
  }

  update(data) {
    this._id = data._id || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.name = data.name || '';
    this.token = data.token || '';
    this.refreshToken = data.refreshToken || '';
  }

  static clone(data) {
    const user = new User();
    user.update(data);
    return user;
  }
}
