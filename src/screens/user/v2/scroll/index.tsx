/*
 * @Author: czy0729
 * @Date: 2022-03-16 16:30:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:15:52
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import Scroll from './scroll'
import { COMPONENT } from './ds'

import type { Ctx } from '../types'

/** iOS 和 WEB 用 */
function ScrollWrap() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <Scroll
      fixedHeight={$.fixedHeight}
      page={$.state.page}
      scrollToOffset={$.scrollToOffset}
      onChange={$.onChange}
      onScroll={$.onScroll}
    />
  )
}

export default observer(ScrollWrap)
