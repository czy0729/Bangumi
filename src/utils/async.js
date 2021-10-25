/*
 * 这种写法是为了防止交叉引用
 * @Author: czy0729
 * @Date: 2020-12-04 11:04:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-26 02:19:10
 */
export function getUserStoreAsync() {
  return require('../stores/user').default
}

export function getThemeStoreAsync() {
  return require('../stores/theme').default
}

export function getSystemStoreAsync() {
  return require('../stores/system').default
}

export function getRakuenStoreAsync() {
  return require('../stores/rakuen').default
}

export function s2tAsync(str = '') {
  const { s2t: _s2t } = getSystemStoreAsync().setting
  return _s2t ? require('./thirdParty/cn-char').s2t(str) : str
}
