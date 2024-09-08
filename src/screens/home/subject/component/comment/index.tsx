/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 19:50:07
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { TITLE_COMMENT } from '../../ds'
import { Ctx } from '../../types'
import Comment from './comment.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function CommentWrap({ onBlockRef }, { $ }: Ctx) {
  const { showComment } = systemStore.setting
  const hidden = showComment === -1
  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-comment'>
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
      </Component>
    </Suspense>
  )
}

export default obc(CommentWrap, COMPONENT)
