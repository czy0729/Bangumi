/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:11:05
 */
import React, { Suspense } from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { TITLE_COMMENT } from '../../ds'
import BlockAnchor from '../block-anchor'
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
        <BlockAnchor title={TITLE_COMMENT} onBlockRef={onBlockRef} style={hidden && _.mt.lg} />
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
