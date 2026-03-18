/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:03:28
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { TITLE_COMMENT } from '../../ds'
import Comment from './comment'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function CommentWrap({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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
}

export default observer(CommentWrap)
