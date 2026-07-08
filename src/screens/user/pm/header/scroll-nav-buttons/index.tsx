/*
 * @Author: czy0729
 * @Date: 2025-07-22 20:36:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-06 02:11:58
 */
import React from 'react'
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props } from './types'

function ScrollNavButtons({ onPrevThread, onNextThread, onScrollToTop, onScrollToBottom }: Props) {
  r(COMPONENT)

  return (
    <>
      <IconTouchable
        style={_.mr._xs}
        name='md-keyboard-arrow-up'
        size={24}
        color={_.colorTitle}
        onPress={onPrevThread}
        onLongPress={onScrollToTop}
      />
      <IconTouchable
        name='md-keyboard-arrow-down'
        size={24}
        color={_.colorTitle}
        onPress={onNextThread}
        onLongPress={onScrollToBottom}
      />
    </>
  )
}

export default observer(ScrollNavButtons)
