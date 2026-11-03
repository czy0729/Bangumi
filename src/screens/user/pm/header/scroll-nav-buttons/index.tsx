/*
 * @Author: czy0729
 * @Date: 2025-07-22 20:36:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 *
 * 上下跳转按钮: 线程标签间跳转, 长按到顶/到底
 */
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ScrollNavButtons() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if ($.threads?.length < 2 && ($.pmList?.list?.length ?? 0) < 8) return null

  return (
    <>
      <IconTouchable
        style={_.mr._xs}
        name='md-keyboard-arrow-up'
        size={24}
        color={_.colorTitle}
        onPress={$.onPrevThread}
        onLongPress={$.scrollToTopEnd}
      />
      <IconTouchable
        name='md-keyboard-arrow-down'
        size={24}
        color={_.colorTitle}
        onPress={$.onNextThread}
        onLongPress={$.scrollToBottomEnd}
      />
    </>
  )
}

export default observer(ScrollNavButtons)
