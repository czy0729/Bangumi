/*
 * @Author: czy0729
 * @Date: 2021-11-26 03:14:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 16:18:02
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { useStore } from '@stores'
import List from './list'
import { COMPONENT } from './ds'

import type { Props } from './types'
import type { Ctx } from '../../types'

function ListWrap({ forwardRef, onShowFixedTextarea, onScrollToIndexFailed }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <List
      forwardRef={forwardRef}
      data={$.comments}
      postId={$.postId}
      onScroll={$.onScroll}
      onScrollToIndexFailed={onScrollToIndexFailed}
      onHeaderRefresh={$.fetchTopic}
      onShowFixedTextarea={onShowFixedTextarea}
    />
  ))
}

export default ListWrap
