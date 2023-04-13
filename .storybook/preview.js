/*
 * @Author: czy0729
 * @Date: 2023-04-10 20:43:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 20:33:24
 */
import { addons } from '@storybook/addons'
import { SET_CURRENT_STORY, FORCE_REMOUNT } from '@storybook/core-events'

// 监听 URL 变化
window.addEventListener('popstate', () => {
  const params = parseUrlParams()
  const args = {
    ...params,
    storyId: params.id
  }

  addons.getChannel().emit(SET_CURRENT_STORY, args)
  addons.getChannel().emit(FORCE_REMOUNT, args)
})

export const parameters = {
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
