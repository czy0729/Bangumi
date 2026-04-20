/*
 * @Author: czy0729
 * @Date: 2023-10-31 16:22:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 21:18:40
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Segment } from '@_'
import { systemStore, useStore } from '@stores'
import { t } from '@utils/fetch'
import { COMPONENT, DS } from './ds'

import type { Ctx } from '../../../types'

function RecSegement() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleSelect = useCallback(() => {
    systemStore.switchSetting('subjectTagsRec')

    t('条目.切换标签类型', {
      subjectId: $.subjectId
    })
  }, [$])

  return (
    <Segment
      data={DS}
      selectedIndex={systemStore.setting.subjectTagsRec ? 1 : 0}
      onSelect={handleSelect}
    />
  )
}

export default observer(RecSegement)
