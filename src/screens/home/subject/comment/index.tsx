/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-17 06:46:05
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import Comment from './comment'
import { memoStyles } from './styles'

export default obc((props, { $ }) => {
  // global.rerender('Subject.Comment')

  const { showComment } = systemStore.setting
  if (showComment === -1) return <View style={_.mt.lg} />

  const {
    list,
    pagination: { pageTotal = 0 }
  } = $.subjectComments
  return (
    <Comment
      styles={memoStyles()}
      showComment={showComment}
      pageTotal={pageTotal}
      total={list.length}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
