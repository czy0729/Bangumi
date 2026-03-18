/*
 * @Author: czy0729
 * @Date: 2023-10-31 16:22:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:30:20
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { systemStore, useStore } from '@stores'
import { t } from '@utils/fetch'
import { COMPONENT, DS } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function RecSegement() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleValueChange = useCallback(() => {
    systemStore.switchSetting('subjectTagsRec')

    t('条目.切换标签类型', {
      subjectId: $.subjectId
    })
  }, [$])

  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={DS}
      selectedIndex={systemStore.setting.subjectTagsRec ? 1 : 0}
      onValueChange={handleValueChange}
    />
  )
}

export default observer(RecSegement)
