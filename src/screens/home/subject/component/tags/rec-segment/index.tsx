/*
 * @Author: czy0729
 * @Date: 2023-10-31 16:22:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:08:11
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { COMPONENT, DS } from './ds'
import { styles } from './styles'

function RecSegement() {
  const { $ } = useStore<Ctx>()
  const selectedIndex = systemStore.setting.subjectTagsRec ? 1 : 0
  return (
    <SegmentedControl
      key={String(selectedIndex)}
      style={styles.segment}
      size={11}
      values={DS}
      selectedIndex={selectedIndex}
      onValueChange={() => {
        t('条目.切换标签类型', {
          subjectId: $.subjectId
        })

        systemStore.switchSetting('subjectTagsRec')
      }}
    />
  )
}

export default ob(RecSegement, COMPONENT)
