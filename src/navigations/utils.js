/*
 * @Author: czy0729
 * @Date: 2020-09-25 21:20:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-04 13:58:24
 */
import { log } from '@utils/dev'

/**
 * 防止多次快速点击重复进入相同页面
 */
const ACTIONS = [
  'Navigation/BACK',
  'Navigation/NAVIGATE',
  'Navigation/POP',
  'Navigation/POP_TO_TOP',
  'Navigation/RESET',
  'Navigation/REPLACE'
]
let lastStringify = ''

export const navigateOnce = getStateForAction => (action, lastState) => {
  const { type, routeName, params } = action
  if (type === 'Navigation/PUSH') {
    const currentStringify = `${routeName}/${JSON.stringify(params)}`
    if (currentStringify === lastStringify) {
      log(`🔒 ${routeName}`)
      return null
    }

    lastStringify = currentStringify
  }

  // 退后就算进入相同页面也是允许的
  if (ACTIONS.includes(type)) {
    lastStringify = ''
  }
  return getStateForAction(action, lastState)
}
