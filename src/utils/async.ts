/*
 * 这种写法是为了防止交叉引用, 其实不是 Async 是 Sync (写错了)
 *
 * @Author: czy0729
 * @Date: 2020-12-04 11:04:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-13 06:17:44
 */

/** 同步取 UserStore */
export function getUserStoreAsync() {
  return require('../stores/user').default
}

/** 同步取 ThemeStore */
export function getThemeStoreAsync() {
  return require('../stores/theme').default
}

/** 同步取 SystemStore */
export function getSystemStoreAsync() {
  return require('../stores/system').default
}

/** 同步取 UIStore */
export function getUIStoreAsync() {
  return require('../stores/ui').default
}

/** 同步取 RakuenStore */
export function getRakuenStoreAsync() {
  return require('../stores/rakuen').default
}

/** 同步 自动判断是否简体转繁体 */
export function s2tAsync(str: any = ''): string {
  if (typeof str !== 'string') return str

  const { s2t: _s2t } = getSystemStoreAsync().setting
  return _s2t ? require('./thirdParty/cn-char').s2t(str) : str
}
