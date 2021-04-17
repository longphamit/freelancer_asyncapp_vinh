export default {
  DEEP_LINK: 'deep-link',
  NOTIFICATION_OPENED: 'notification-opened',
};

export const STORAGE = {
  USER_DATA: 'user_data',
  USER_LANGUAGE: 'user_language',
};

export const OS = {
  IOS: 'ios',
  ANDROID: 'android',
};

export const SERVICES = {
  REQUEST_TIME_OUT: 30 * 1000, // 30s
  CONTENT_TYPE_FORM_URLENCODED: 'application/x-www-form-urlencoded',
  CONTENT_TYPE_APP_JSON: 'application/json',
  CONTENT_TYPE_FORM_DATA: 'multipart/form-data',
};

export const RESPONSE_STATUS_CODES = {
  ERROR: 'error',
  SUCCESS: 'success',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
  PARAM_INVALID: 'param_invalid',
  TOKEN_EXPIRED: 'token_expired',
  TOKEN_INVALID: 'token_invalid',
  NO_CONTENT: 'no_content',
  DUPLICATED: 'duplicated',
  INVALID_STATE: 'invalid_state',
};

export const API_BASE_URL = 'http://syclipboard.throwidea.com/api/v1';

export const SOCKET_URL = API_BASE_URL + ':8000/clipboard';

export const NOTIFY_CHANNELS = {
  DEFAULT: 'default',
};

export const MODES = {
  SYNC: 'sync',
  SHARE: 'share',
};

export const CLIPBOARD_TYPES = {
  ALL: 'all_clipboards',
  IMAGE: 'image',
  LINK: 'link',
  FILE: 'file',
};
