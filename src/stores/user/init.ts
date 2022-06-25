/*
 * @Author: czy0729
 * @Date: 2019-07-10 16:01:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-25 18:08:59
 */
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { Images, SubjectType } from '@types'

export const NAMESPACE = 'User'

export const DEFAULT_SCOPE = MODEL_SUBJECT_TYPE.getLabel<SubjectType>('动画')

export const INIT_ACCESS_TOKEN = {
  access_token: '',
  expires_in: 604800,
  token_type: 'Bearer',
  scope: null,
  user_id: 0,
  refresh_token: ''
}

export const INIT_USER_INFO = {
  avatar: {} as Images,
  id: 0,
  nickname: '',
  sign: '',
  url: '',
  usergroup: '',
  username: ''
}

export const INIT_USER_COOKIE = {
  cookie: '',
  userAgent: '',
  v: 0,
  tourist: 0
}

export const INIT_USER_SETTING = {
  sign: '',
  nickname: '',
  sign_input: '',
  formhash: ''
}
