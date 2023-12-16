/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 13:50:24
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { TITLE_COMMENT } from '../ds'
import Comment from './comment'
import { memoStyles } from './styles'

export default obc(({ onBlockRef }, { $ }) => {
  rerender('Subject.Comment')

  const { showComment } = systemStore.setting
  const hidden = showComment === -1
  return (
    <>
      <View
        ref={(ref: any) => onBlockRef(ref, TITLE_COMMENT)}
        style={hidden && _.mt.lg}
      />
      {!hidden && (
        <Comment
          styles={memoStyles()}
          showComment={showComment}
          commentLength={$.commentLength}
          onSwitchBlock={$.onSwitchBlock}
        />
      )}
    </>
  )
})
