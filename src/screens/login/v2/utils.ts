/*
 * @Author: czy0729
 * @Date: 2026-10-23 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 11:00:00
 *
 * 页面数据收尾: 本地设置读写 / 游客账号取数 / 登录成功入库
 */
import { rakuenStore, usersStore, userStore } from '@stores'
import { feedback, getStorage, queue, setStorage } from '@utils'
import { t } from '@utils/fetch'
import { get } from '@utils/kv'
import { confirmDownloadSetting } from '@screens/user/setting/component/system/utils'
import { NAMESPACE } from './ds'

import type {
  LocalSettingKey,
  LoginState,
  RestorableSettingKey,
  SaveLoginParams,
  TouristResult
} from './types'

/** 读取本地上次登录信息 (仅限 RestorableSettingKey) */
export async function restoreLoginSetting(): Promise<
  Partial<Pick<LoginState, RestorableSettingKey>>
> {
  const [email, password, isSyncSetting] = await Promise.all([
    getStorage<string>(`${NAMESPACE}|email`),
    getStorage<string>(`${NAMESPACE}|password`),
    getStorage<boolean>(`${NAMESPACE}|isSyncSetting`)
  ])

  const restored: Partial<Pick<LoginState, RestorableSettingKey>> = {}
  if (email) restored.email = email
  if (password) restored.password = password
  if (isSyncSetting) restored.isSyncSetting = isSyncSetting

  return restored
}

/**
 * 保存单条登录设置
 *
 * @param key 设置项
 * @param value 值
 */
export function saveLoginSetting(key: LocalSettingKey, value: string | boolean) {
  setStorage(`${NAMESPACE}|${key}`, value)
}

/** 读取游客账号 cookie 并写入 store */
export async function fetchTouristUser() {
  const { accessToken, userCookie } = await get<TouristResult>('tourist')
  userStore.updateAccessToken(accessToken)
  userStore.updateUserCookie({
    cookie: userCookie.cookie,
    userAgent: userCookie.userAgent,
    v: 0,
    tourist: 1
  })
}

/**
 * 登录成功后写入 store, 并拉取用户数据
 *
 * @param cookie 登录 cookie
 * @param userAgent 请求 UA
 * @param accessToken 授权 token
 * @param navigation 导航
 * @param isSyncSetting 是否登录后同步云端设置
 */
export function saveLoginResult({
  cookie,
  userAgent,
  accessToken,
  navigation,
  isSyncSetting
}: SaveLoginParams) {
  userStore.updateUserCookie({
    cookie,
    userAgent,
    v: 0
  })
  userStore.updateAccessToken(accessToken)
  feedback()
  navigation.popToTop()
  t('登陆.成功')

  queue(
    [
      () => userStore.fetchUserInfo(),
      () => userStore.fetchUsersInfo(),
      () => userStore.fetchUserSetting(),
      () => {
        return isSyncSetting() ? confirmDownloadSetting() : true
      },
      () => rakuenStore.fetchPrivacy(),
      () => usersStore.fetchFriends()
    ],
    1
  )
}
