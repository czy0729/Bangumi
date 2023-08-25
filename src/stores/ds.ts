/*
 * @Author: czy0729
 * @Date: 2022-11-27 16:49:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-24 13:22:14
 */
/** 显示 state init */
export const LOG_INIT = false

export const USERS_STORE_KEYS = ['users'] as const

/** userCookie 一定要在 userInfo 和 usersInfo 之后读取 */
export const USER_STORE_KEYS = [
  'accessToken',
  'formhash',
  'userInfo',
  'usersInfo',
  'userCookie',
  'collection',
  'userSetting'
] as const

/** 把这些值提前取出来是为了防止首次首页列表多次计算渲染 */
export const CALENDAR_STORE_KEYS = ['onAir', 'onAirUser'] as const

export const COLLECTION_STORE_KEYS = ['userCollectionsMap'] as const

export const RAKUEN_STORE_KEYS = ['blockedUsersTrack'] as const

export const SMB_STORE_KEYS = ['data'] as const
