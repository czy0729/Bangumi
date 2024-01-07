/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:43:25
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { TITLE_COMMENT } from '../../ds'
import { Ctx } from '../../types'
import Comment from './comment'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function CommentWrap({ onBlockRef }, { $ }: Ctx) {
  const { showComment } = systemStore.setting
  const hidden = showComment === -1
  return (
    <>
      <View
        ref={(ref: any) => onBlockRef(ref, TITLE_COMMENT)}
        style={stl(_.container.layout, hidden && _.mt.lg)}
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
}

export default obc(CommentWrap, COMPONENT)
