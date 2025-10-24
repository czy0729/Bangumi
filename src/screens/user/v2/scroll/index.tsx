/*
 * @Author: czy0729
 * @Date: 2022-03-16 16:30:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 17:33:27
 */
import React from 'react'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Scroll from './scroll'
import { COMPONENT } from './ds'

import type { Ctx } from '../types'

/** iOS 和 WEB 用 */
function ScrollWrap() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { page } = $.state

    return (
      <Scroll
        fixedHeight={$.fixedHeight}
        page={page}
        scrollToOffset={$.scrollToOffset}
        fetchCollections={$.fetchCollections}
        onChange={$.onChange}
        onScroll={$.onScroll}
      />
    )
  })
}

export default ScrollWrap
