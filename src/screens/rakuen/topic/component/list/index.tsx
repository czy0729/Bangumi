/*
 * @Author: czy0729
 * @Date: 2021-11-26 03:14:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 23:40:15
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import List from './list'
import { COMPONENT } from './ds'

function ListWrap({ forwardRef, onShowFixedTextarea, onScrollToIndexFailed }) {
  const { $ } = useStore<Ctx>()
  return (
    <List
      forwardRef={forwardRef}
      data={$.comments}
      postId={$.postId}
      onScroll={$.onScroll}
      onScrollToIndexFailed={onScrollToIndexFailed}
      onHeaderRefresh={$.fetchTopic}
      onShowFixedTextarea={onShowFixedTextarea}
    />
  )
}

export default ob(ListWrap, COMPONENT)
