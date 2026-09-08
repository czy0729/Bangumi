/*
 * @Author: czy0729
 * @Date: 2020-12-04 11:04:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-19 20:42:07
 *
 * 出现这种写法是因为设计失误, 为了避免遇到交叉引用, 尽量少用
 */
import type { RakuenStoreType } from '../../stores/rakuen'
import type { SystemStoreType } from '../../stores/system'
import type { ThemeStoreType } from '../../stores/theme'
import type { UIStoreType } from '../../stores/ui'
import type { UserStoreType } from '../../stores/user'

// store 为单例, 首次获取后缓存实例, 后续调用直接复用
let __userStore: UserStoreType
let __themeStore: ThemeStoreType
let __systemStore: SystemStoreType
let __uiStore: UIStoreType
let __rakuenStore: RakuenStoreType

/** [同步] 获取 userStore 实例 */
export function syncUserStore() {
  if (!__userStore) {
    __userStore = (require('../../stores/user') as { default: UserStoreType }).default
  }
  return __userStore
}

/** [同步] 获取 themeStore 实例 */
export function syncThemeStore() {
  if (!__themeStore) {
    __themeStore = (require('../../stores/theme') as { default: ThemeStoreType }).default
  }
  return __themeStore
}

/** [同步] 获取 systemStore 实例 */
export function syncSystemStore() {
  if (!__systemStore) {
    __systemStore = (require('../../stores/system') as { default: SystemStoreType }).default
  }
  return __systemStore
}

/** [同步] 获取 uiStore 实例 */
export function syncUIStore() {
  if (!__uiStore) {
    __uiStore = (require('../../stores/ui') as { default: UIStoreType }).default
  }
  return __uiStore
}

/** [同步] 获取 rakuenStore 实例 */
export function syncRakuenStore() {
  if (!__rakuenStore) {
    __rakuenStore = (require('../../stores/rakuen') as { default: RakuenStoreType }).default
  }
  return __rakuenStore
}

// 文本处理模块延迟加载并缓存实例 (require 保留静态字面量路径, 以便打包工具分析)
let __s2t: { s2t: (str: string) => string } | undefined
let __spacing: { spacing: (text: string) => string } | undefined

/**
 * [同步] 按设置执行简体转繁体
 * 非字符串原样返回 (保持传入类型不变)
 */
export function syncS2T<T>(str: T): T {
  if (typeof str !== 'string') return str

  const { s2t } = syncSystemStore().setting
  if (!s2t) return str

  if (!__s2t) __s2t = require('../thirdParty/open-cc') as { s2t: (str: string) => string }
  return __s2t.s2t(str) as T
}

/**
 * [同步] 按设置执行加空格排版
 * 非字符串原样返回 (保持传入类型不变)
 */
export function syncSpacing<T>(str: T): T {
  if (typeof str !== 'string') return str

  const { spacing } = syncSystemStore().setting
  if (!spacing) return str

  if (!__spacing) {
    __spacing = require('../thirdParty/pangu-lite') as { spacing: (text: string) => string }
  }
  return __spacing.spacing(str) as T
}
