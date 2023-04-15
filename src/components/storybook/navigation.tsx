/*
 * @Author: czy0729
 * @Date: 2023-04-09 08:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-15 05:37:42
 */
import { AnyObject, Fn } from '@types'
import { urlStringify } from '@utils'
import { SHARE_MODE } from '@constants'
import { navigate, parseUrlParams } from './utils'

export const StorybookNavigation = {
  getState() {
    return {
      index: 1 // window.history.length
    }
  },
  navigate(routeName: string, params?: AnyObject) {
    navigate(routeName, params)
  },
  push(routeName: string, params?: AnyObject) {
    navigate(routeName, params)
  },
  replace(routeName: string, params?: AnyObject) {
    navigate(routeName, params, true)
  },
  goBack() {
    navigate()
  },
  addListener(): Fn {
    // console.info('Navigation: addListener', eventType)
    return () => {}
  },
  setOptions() {}
}

/** Demo 展示用默认参数 */
const DEMO_PARAMS = {
  userId: 'sukaretto',
  subjectId: 376703,
  catalogId: 44079,
  monoId: 'person/5745',
  groupId: 'boring',
  topicId: 'group/350677',
  blogId: 319794,
  sayId: 33457566,
  name: '偶像大师 灰姑娘女孩 U149',
  tag: '2023年4月',
  title: '标准差',
  message: [
    '0-1 异口同声',
    '1.15 基本一致',
    '1.3 略有分歧',
    '1.45 莫衷一是',
    '1.6 各执一词',
    '1.75 你死我活'
  ]
} as const

export function getStorybookRoute(routeName: string) {
  return {
    params: {
      ...(SHARE_MODE ? {} : DEMO_PARAMS),

      // 页面参数
      routeName,
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
