import axios from 'axios';

import { API_BASE_URL, SERVICES } from '../commons/constants';

export default class ApiClient {
  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: SERVICES.REQUEST_TIME_OUT,
    });

    this.instance.interceptors.request.use(request => {
      console.log('Api request', request);
      return request;
    });

    this.instance.interceptors.response.use(response => {
      console.log('Api response', response);
      return response;
    });

    this.token = '';
    this.refreshToken = '';
  }

  load = (token, refreshToken) => {
    this.token = token;
    this.refreshToken = refreshToken;
  };

  request = async (
    method,
    path,
    requestHeaders,
    params = null,
    data = null,
    authenticate = null,
  ) => {
    const headers = {
      ...requestHeaders,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    };

    if (authenticate) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return this.instance
      .request({
        method,
        url: path,
        params,
        data,
        headers,
      })
      .then(async response => {
        if (authenticate && response.status === 'unauthorized') {
          const loginState = await this.instance.request({
            method: 'POST',
            url: '/users/token',
            data: { refreshToken: this.refreshToken },
          });
          if (
            loginState &&
            loginState.data &&
            loginState.data.status === 'success'
          ) {
            const { token, refreshToken } = loginState.data.data[0];

            this.token = token;
            this.refreshToken = refreshToken;
          }
        }
        return response.data;
      })
      .catch(async error => {
        if (authenticate && error.status === 'unauthorized') {
          const loginState = await this.instance.request({
            method: 'POST',
            url: '/users/token',
            data: { refreshToken: this.refreshToken },
          });
          if (
            loginState &&
            loginState.data &&
            loginState.data.status === 'success'
          ) {
            const { token, refreshToken } = loginState.data.data[0];

            this.token = token;
            this.refreshToken = refreshToken;
          }
        }

        if (error && error.response && error.response.data) {
          return error.response.data;
        }
        return error;
      });
  };

  get = async (
    path,
    params = null,
    authenticate = false,
    requestHeaders = null,
  ) => {
    let headers = requestHeaders || {};
    headers = { 'Content-Type': 'application/json', ...headers };
    return this.request('GET', path, headers, params, null, authenticate);
  };

  post = async (
    path,
    data = null,
    authenticate = false,
    requestHeaders = null,
  ) => {
    let headers = requestHeaders || {};
    headers = { 'Content-Type': 'application/json', ...headers };
    return this.request('POST', path, headers, null, data, authenticate);
  };

  put = async (
    path,
    data = null,
    authenticate = false,
    requestHeaders = null,
  ) => {
    let headers = requestHeaders || {};
    headers = { 'Content-Type': 'application/json', ...headers };
    return this.request('PUT', path, headers, null, data, authenticate);
  };

  delete = async (
    path,
    data = null,
    authenticate = false,
    requestHeaders = null,
  ) => {
    let headers = requestHeaders || {};
    headers = { 'Content-Type': 'application/json', ...headers };
    return this.request('DELETE', path, headers, null, data, authenticate);
  };

  // Auth

  login = data => {
    return this.post('/users/login', data);
  };

  register = data => {
    return this.post('/users', data);
  };

  logout = data => {
    return this.post('/users/logout', data, true);
  };

  forgotPassword = data => {
    return this.post('/users/forgot-password', data);
  };

  // User

  getProfile = userId => {
    return this.get(`/users/${userId}`, null, true);
  };

  updateProfile = (userId, data) => {
    return this.put(`/users/${userId}`, data, true);
  };

  // Clipboard

  getClipboards = params => {
    return this.get('/clipboards', params, true);
  };

  getClipboard = clipboardId => {
    return this.get(`/clipboards/${clipboardId}`, null, true);
  };

  addClipboard = data => {
    return this.post('/clipboards', data, true);
  };

  removeClipboard = clipboardId => {
    return this.delete(`/clipboards/${clipboardId}`, null, true);
  };

  removeAllClipboards = () => {
    return this.delete('/clipboards', null, true);
  };

  // Config

  enableSaveHistory = () => {
    return this.post('/clipboards/history', null, true);
  };

  disableSaveHistory = () => {
    return this.delete('/clipboards/enable', null, true);
  };

  changeMode = mode => {
    return this.post('/modes', { mode }, true);
  };
}
