/*
 * @Author: czy0729
 * @Date: 2023-04-10 20:43:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-03 16:12:23
 */
import { addons } from '@storybook/addons'
import { SET_CURRENT_STORY, FORCE_REMOUNT } from '@storybook/core-events'
import { __FORCE_SET_NAVIGATING__ } from '@components/storybook/state'
import { StorybookNavigation } from '@components/storybook/navigation'
import { injectUtils } from '@utils/dom'
import { DEV, SHARE_MODE } from '@constants'
import { parseUrlParams } from './utils'
import { parameters, decorators } from './ds'

export { parameters, decorators }

/** ========== 监听 URL 变化 ========== */
/** 简单维护路由历史 */
const historyStack = [window.location.href]

window.addEventListener('popstate', event => {
  const params = parseUrlParams()
  const args = {
    ...params,
    storyId: params.id
  }

  // 如果直接点击浏览器内部的后退按钮, 是不会经过页面内的 navigate 方法的
  // 这里暂时主动更新内部观察变量的状态
  __FORCE_SET_NAVIGATING__()

  // Storybook 内部强制刷新页面渲染的方法
  addons.getChannel().emit(SET_CURRENT_STORY, args)
  addons.getChannel().emit(FORCE_REMOUNT, args)

  // 简单维护路由记录, 数据并不一定准确, 但是够用
  const newUrl = window.location.href.replace(/\/$/, '')
  const newIndex = historyStack.findIndex(url => url.replace(/\/$/, '') === newUrl)
  if (newIndex > -1) {
    // 执行后退操作的逻辑
    StorybookNavigation._updateHistory(-1)
    historyStack.pop()
  } else {
    // 执行前进操作的逻辑
    StorybookNavigation._updateHistory(1)
    historyStack.push(newUrl)
  }
})

/** ========== 监听宽度发生变化 ========== */
window.lastWidth = window.innerWidth
window.onresize = function () {
  if (
    (window.innerWidth <= 480 || window.lastWidth <= 480) &&
    window.innerWidth !== window.lastWidth
  ) {
    setTimeout(() => {
      location.reload()
    }, 800)
  }
}

/** ========== 开发环境一些辅助代码 ========== */
;(() => {
  setTimeout(() => {
    injectUtils()

    const originalConsoleError = window.console.error
    window.console.error = function (...args) {
      const errorMessage = args[0] || ''

      // 检查警告消息是否以特定的开头文字开始
      if (
        // 这个是旧的代码库里面经常用的写法, 不影响实际运行, 可以忽视
        String(errorMessage).startsWith('EventEmitter.removeListener')
      ) {
        // 忽略该警告，不做任何操作
        return
      }

      // 其他情况下，调用原始的 console.error 方法
      originalConsoleError.apply(console, args)
    }
  }, 4000)

  if (SHARE_MODE) {
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('.sb-wrapper').forEach(element => {
        element.remove()
      })
    })
  }
})()
