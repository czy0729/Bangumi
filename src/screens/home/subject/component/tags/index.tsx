/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:14:25
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { systemStore, useStore } from '@stores'
import { TITLE_TAGS } from '../../ds'
import BlockAnchor from '../block-anchor'
import Split from '../split'
import Tags from './tags'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function TagsWrap({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.showTags[1]) return null

  const styles = memoStyles()

  return (
    <Component id='screen-subject-tags'>
      <BlockAnchor title={TITLE_TAGS} onBlockRef={onBlockRef} />

      <Tags
        styles={styles}
        show={systemStore.setting.showTags && !!$.tags.length}
        showTags={systemStore.setting.showTags}
        showTyperank={!!$.rank && systemStore.setting.subjectTagsRec}
        subjectTagsExpand={systemStore.setting.subjectTagsExpand}
        rank={$.rank}
        focusOrigin={systemStore.setting.focusOrigin}
        onSwitchBlock={$.onSwitchBlock}
      />

      <Split style={styles.split} />
    </Component>
  )
}

export default observer(TagsWrap)
