/*
 * 出现这种写法是因为设计失误, 为了避免遇到交叉引用, 尽量少用
 * @Author: czy0729
 * @Date: 2020-12-04 11:04:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-19 20:42:07
 */
import type { RakuenStoreType } from '../../stores/rakuen'
import type { SystemStoreType } from '../../stores/system'
import type { ThemeStoreType } from '../../stores/theme'
import type { UIStoreType } from '../../stores/ui'
import type { UserStoreType } from '../../stores/user'

/** [同步] 获取 userStore 实例 */
export function syncUserStore() {
  return (require('../../stores/user') as { default: UserStoreType }).default
}

/** [同步] 获取 themeStore 实例 */
export function syncThemeStore() {
  return (require('../../stores/theme') as { default: ThemeStoreType }).default
}

/** [同步] 获取 systemStore 实例 */
export function syncSystemStore() {
  return (require('../../stores/system') as { default: SystemStoreType }).default
}

/** [同步] 获取 uiStore 实例 */
export function syncUIStore() {
  return (require('../../stores/ui') as { default: UIStoreType }).default
}

/** [同步] 获取 rakuenStore 实例 */
export function syncRakuenStore() {
  return (require('../../stores/rakuen') as { default: RakuenStoreType }).default
}

/**
 * [同步] 自动判断是否简体转繁体
 * 非字符串原样返回 (保持传入类型不变)
 */
export function syncS2T<T>(str: T): T {
  if (typeof str !== 'string') return str

  return syncSystemStore().setting.s2t
    ? ((require('../thirdParty/open-cc') as { s2t: (str: string) => string }).s2t(str) as T)
    : str
}

/**
 * [同步] 自动判断是否加空格排版
 * 非字符串原样返回 (保持传入类型不变)
 */
export function syncSpacing<T>(str: T): T {
  if (typeof str !== 'string') return str

  return syncSystemStore().setting.spacing
    ? ((require('../thirdParty/pangu-lite') as { spacing: (text: string) => string }).spacing(
        str
      ) as T)
    : str
}
