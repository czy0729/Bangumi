/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * 安卓用，仿 iOS 点击头部列表滚动到顶
 * @Author: czy0729
 * @Date: 2020-12-04 16:23:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 11:08:13
 */
import { observer } from 'mobx-react'
import { scrollToTopCallback } from './utils'
import { Props as ScrollToToProps } from './types'

export { ScrollToToProps, scrollToTopCallback }

const ScrollToTop = observer(
  ({
    isFocused = true,
    scrollTo,
    scrollToIndex,
    scrollToLocation,
    onPress
  }: ScrollToToProps) => {
    return null
  }
)

// @ts-expect-error
ScrollToTop.scrollToTop = () => {}

export { ScrollToTop }
