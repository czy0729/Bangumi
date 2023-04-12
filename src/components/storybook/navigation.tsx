/*
 * @Author: czy0729
 * @Date: 2023-04-09 08:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:16:21
 */
import { AnyObject, Fn } from '@types'
import { urlStringify } from '@utils'
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
  addListener(eventType: string): Fn {
    console.info('Navigation: addListener', eventType)
    return () => {}
  },
  setOptions() {}
}

export function getStorybookRoute(routeName: string) {
  return {
    params: {
      name: routeName,
      ...parseUrlParams()
    }
  }
}

export function getStorybookArgs(routeName: string) {
  const route = getStorybookRoute(routeName)
  return {
    key: urlStringify(route.params),
    navigation: StorybookNavigation,
    route
  }
}
