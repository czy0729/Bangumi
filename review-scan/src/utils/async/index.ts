/*
 * 出现这种写法是因为设计失误, 为了避免遇到交叉引用, 尽量少用
 * @Author: czy0729
 * @Date: 2020-12-04 11:04:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-13 17:43:33
 */
import { RakuenStoreType } from '../../stores/rakuen'
import { SystemStoreType } from '../../stores/system'
import { ThemeStoreType } from '../../stores/theme'
import { UIStoreType } from '../../stores/ui'
import { UserStoreType } from '../../stores/user'

/** 同步取 UserStore */
export function syncUserStore() {
  return require('../../stores/user').default as UserStoreType
}

/** 同步取 ThemeStore */
export function syncThemeStore() {
  return require('../../stores/theme').default as ThemeStoreType
}

/** 同步取 SystemStore */
export function syncSystemStore() {
  return require('../../stores/system').default as SystemStoreType
}

/** 同步取 UIStore */
export function syncUIStore() {
  return require('../../stores/ui').default as UIStoreType
}

/** 同步取 RakuenStore */
export function syncRakuenStore() {
  return require('../../stores/rakuen').default as RakuenStoreType
}

/** 同步 自动判断是否简体转繁体 */
export function s2tAsync(str: any = ''): string {
  if (typeof str !== 'string') return str

  const { s2t: _s2t } = syncSystemStore().setting
  return _s2t ? require('../thirdParty/open-cc').s2t(str) : str
}
