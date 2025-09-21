/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-21 19:24:10
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { TITLE_COMMENT } from '../../ds'
import { Ctx } from '../../types'
import Comment from './comment.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function CommentWrap({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { showComment } = systemStore.setting
    const hidden = showComment === -1
    return (
      <Suspense fallback={null}>
        <Component id='screen-subject-comment'>
          <View
            ref={ref => onBlockRef(ref, TITLE_COMMENT)}
            style={stl(_.container.layout, hidden && _.mt.lg)}
            collapsable={false}
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
  })
}

export default CommentWrap
