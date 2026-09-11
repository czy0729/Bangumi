/*
 * @Author: czy0729
 * @Date: 2020-12-04 16:23:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 20:26:54
 */
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { scrollToTopCallback } from './utils'
import { COMPONENT } from './ds'

import type { Props as ScrollToToProps } from './types'

export { scrollToTopCallback }

export type { ScrollToToProps }

/** [Android] 仿 iOS 点击头部列表滚动到顶 (已停用) */
const ScrollToTop = observer(() => {
  r(COMPONENT)

  return null
})

// @ts-expect-error
ScrollToTop.scrollToTop = (
  fn: (arg0: { animated: boolean; index: number; viewOffset: number }) => void
) => {
  if (typeof fn === 'function') {
    try {
      fn({
        animated: true,
        index: 0,
        viewOffset: _.window.height * 2
      })
    } catch (error) {}
  }
}

export { ScrollToTop }

export default ScrollToTop
