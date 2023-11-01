/*
 * @Author: czy0729
 * @Date: 2023-04-09 08:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 16:24:10
 */
import { AnyObject, Fn } from '@types'
import { urlStringify } from '@utils'
import { SHARE_MODE } from '@constants'
import { navigate, parseUrlParams } from './utils'

export const StorybookNavigation = {
  _history: {
    length: 1
  },
  _updateHistory(value: 1 | -1) {
    const { length } = this._history
    if (length === 1 && value === -1) return
    this._history.length += value
  },
  getState() {
    return {
      index: this._history.length
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
  popToTop() {
    this._history.length = 1
    navigate('Discovery', {}, true)
  },

  /**
   * 这是主动调用 navigation.goBack 触发, 若直接点击浏览器的后退按钮是不会触发的
   * 所以 history.length 还需要在 /Bangumi32/.storybook/preview.js 里的 window.addEventListener('popstate') 中主动维护
   * */
  goBack() {
    navigate()
  },
  addListener(): Fn {
    return () => {}
  },
  setOptions() {},
  getRootState() {},
  emit() {}
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
