/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 *
 * 章节入口, 按条目类型分派书籍 / 音乐 / 动画章节
 */
import { observer } from 'mobx-react'
import { Component } from '@components'
import { subjectStore, systemStore, useStore } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { TITLE_DISC, TITLE_EP } from '../../ds'
import BlockAnchor from '../block-anchor'
import Split from '../split'
import BookEp from './book-ep'
import Disc from './disc'
import Ep from './ep'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function EpWrap({ onBlockRef, onScrollIntoViewIfNeeded }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const typeCn = $.type || MODEL_SUBJECT_TYPE.getTitle(subjectStore.type($.subjectId))

  if (!$.showEp[1]) return null

  return (
    <Component id='screen-subject-ep'>
      <BlockAnchor title={typeCn === '音乐' ? TITLE_DISC : TITLE_EP} onBlockRef={onBlockRef} />

      {typeCn === '书籍' ? (
        <BookEp onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded} />
      ) : typeCn === '音乐' ? (
        <Disc />
      ) : (
        <Ep
          styles={memoStyles()}
          watchedEps={$.state.watchedEps}
          totalEps={$.subjectFormHTML.totalEps || '0'}
          onAirCustom={$.onAirCustom}
          status={$.collection.status}
          isDoing={$.collection?.status?.type === 'do'}
          showEpInput={systemStore.setting.showEpInput}
          showCustomOnair={systemStore.setting.showCustomOnair}
          focusOrigin={systemStore.setting.focusOrigin}
          onChangeText={$.changeText}
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          doUpdateSubjectEp={$.doUpdateSubjectEp}
        />
      )}

      <Split />
    </Component>
  )
}

export default observer(EpWrap)
