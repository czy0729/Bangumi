/*
 * @Author: czy0729
 * @Date: 2023-04-10 20:43:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 16:23:58
 */
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Provider from '@ant-design/react-native/lib/provider'
import { addons } from '@storybook/addons'
import { SET_CURRENT_STORY, FORCE_REMOUNT } from '@storybook/core-events'
import { __FORCE_SET_NAVIGATING__ } from '@components/storybook/state'
import { StorybookNavigation } from '@components/storybook/navigation'
import { AppCommon } from '@_/base/app-common'
import { _ } from '@stores'
import { injectUtils } from '@utils/dom'
import theme from '@styles/theme'

injectUtils()

const historyStack = [window.location.href]

// 监听 URL 变化
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

export const parameters = {
  options: {
    title: 'Bangumi 番组计划'
  },
  darkMode: {
    current: 'dark',
    darkClass: 'dark',
    classTarget: 'html',
    stylePreview: true
  },
  actions: {
    argTypesRegex: '^on[A-Z].*'
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

function parseUrlParams() {
  const params = new URLSearchParams(window.location.search)
  const result = {}

  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

export const decorators = [
  Story => (
    <Provider theme={theme}>
      <GestureHandlerRootView style={styles.container}>
        <Story />
      </GestureHandlerRootView>
      <AppCommon />
    </Provider>
  )
]

const styles = _.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
