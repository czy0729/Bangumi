/*
 * @Author: czy0729
 * @Date: 2023-04-09 08:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 03:57:36
 */
import { getSPAId } from '@utils'
import { SHARE_MODE, WEB } from '@constants'
import { getCurrentStoryId, navigate, parseUrlParams } from './utils'
import { BOTTOM_TAB_DS } from './ds'

import type { StorybookNavigationType } from './types'

const BOTTOM_TAB_IDS = BOTTOM_TAB_DS.map(item => ({
  id: item.id,
  storyId: getSPAId(item.id)
}))

/** 保存 navigation.addListener */
const navigationEventList = new Map<string, () => void>()

/** [WEB] 单页面仿 react-natigation 的路由对象 context */
const _history: {
  length: number
  lastBottomTab: string
} = {
  length: 1,
  lastBottomTab: WEB
    ? BOTTOM_TAB_IDS.find(item => item.storyId === getCurrentStoryId())?.id || BOTTOM_TAB_DS[0].id
    : 'Discovery'
}

function _updateHistory(value: 1 | -1) {
  if (_history.length === 1 && value === -1) return
  _history.length += value
}

function _updateBottomTabCurrent(routeName: string) {
  if (BOTTOM_TAB_IDS.find(item => item.id === routeName)) {
    _history.lastBottomTab = routeName
  }
}

export const StorybookNavigation: StorybookNavigationType = {
  /** ==================== private ==================== */
  _history,
  _updateHistory,
  _updateBottomTabCurrent,

  /** ==================== method ==================== */
  getState() {
    return {
      index: _history.length
    }
  },
  navigate(routeName?: string, params?: Record<string, unknown>) {
    if (routeName) _updateBottomTabCurrent(routeName)
    navigate(routeName, params)
  },
  push(routeName: string, params?: Record<string, unknown>) {
    _updateBottomTabCurrent(routeName)
    navigate(routeName, params)
  },
  replace(routeName: string, params?: Record<string, unknown>) {
    _updateBottomTabCurrent(routeName)
    navigate(routeName, params, true)
  },
  popToTop() {
    _history.length = 1
    navigate(_history.lastBottomTab, {}, true)
  },

  /**
   * 这是主动调用 navigation.goBack 触发, 若直接点击浏览器的后退按钮是不会触发的
   * 所以 history.length 还需要在 /Bangumi32/.storybook/preview.js 里的 window.addEventListener('popstate') 中主动维护
   * */
  goBack() {
    navigate()
  },
  /** 订阅事件 */
  addListener(key: string, callback: () => void): () => void {
    navigationEventList.set(key, callback)
    return () => {
      navigationEventList.delete(key)
    }
  },
  /** 执行订阅事件 */
  emit(args: { type?: string }): void {
    const { type } = args || {}
    if (navigationEventList.has(type)) {
      const callback = navigationEventList.get(type)
      if (typeof callback === 'function') callback()
    }
  },
  setOptions() {},
  getRootState() {
    return undefined
  }
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
    key: routeName,
    name: routeName,
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
    navigation: StorybookNavigation,
    route
  }
}
