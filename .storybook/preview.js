/*
 * @Author: czy0729
 * @Date: 2023-04-10 20:43:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-15 07:51:30
 */
import { addons } from '@storybook/addons'
import { SET_CURRENT_STORY, FORCE_REMOUNT } from '@storybook/core-events'
import { __FORCE_SET_NAVIGATING__ } from '@components/storybook/state'

// 监听 URL 变化
window.addEventListener('popstate', e => {
  const params = parseUrlParams()
  const args = {
    ...params,
    storyId: params.id
  }

  // 如果直接点击浏览器内部的后退按钮, 是不会经过页面内的 navigate 方法的
  // 这里暂时主动更新内部观察变量的状态
  __FORCE_SET_NAVIGATING__()

  addons.getChannel().emit(SET_CURRENT_STORY, args)
  addons.getChannel().emit(FORCE_REMOUNT, args)
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


// export const decorators = [
//   (Story) => (
//     <>
//       <Story />
//     </>
//   ),
// ];
