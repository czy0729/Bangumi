/*
 * @Author: czy0729
 * @Date: 2025-07-22 20:36:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 23:15:29
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

function ScrollNavButtons({ onScrollToTop, onScrollToBottom }) {
  r(COMPONENT)

  return useObserver(() => (
    <>
      <IconTouchable
        style={_.mr._xs}
        name='md-keyboard-arrow-up'
        size={24}
        color={_.colorTitle}
        onPress={onScrollToTop}
      />
      <IconTouchable
        name='md-keyboard-arrow-down'
        size={24}
        color={_.colorTitle}
        onPress={onScrollToBottom}
      />
    </>
  ))
}

export default ScrollNavButtons
