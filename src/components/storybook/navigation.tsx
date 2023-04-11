/*
 * @Author: czy0729
 * @Date: 2023-04-09 08:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 15:35:23
 */
import { AnyObject } from '@types'
import { navigate, parseUrlParams } from './utils'

export const StorybookNavigation = {
  getState() {
    return {
      index: 1
    }
  },
  navigate(routeName: string, params?: AnyObject) {
    navigate(routeName, params)
  },
  push(routeName: string, params?: AnyObject) {
    navigate(routeName, params)
  },
  replace(routeName: string, params?: AnyObject) {
    navigate(routeName, params)
  },
  goBack() {
    window.history.back()
  },
  addListener() {
    return () => {}
  },
  setOptions() {}
}

export function getStorybookRoute(routeName: string) {
  return {
    params: {
      ...parseUrlParams(),
      name: routeName
    }
  }
}
