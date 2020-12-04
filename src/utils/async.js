/*
 * @Author: czy0729
 * @Date: 2020-12-04 11:04:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-04 11:16:21
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
