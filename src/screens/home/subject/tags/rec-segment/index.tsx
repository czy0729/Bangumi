/*
 * @Author: czy0729
 * @Date: 2023-10-31 16:22:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-31 16:28:31
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { ob } from '@utils/decorators'
import { styles } from './styles'
import { systemStore } from '@stores'

const DS = ['数量', '比例'] as const

function RecSegement() {
  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={DS}
      selectedIndex={systemStore.setting.subjectTagsRec ? 1 : 0}
      onValueChange={() => {
        systemStore.switchSetting('subjectTagsRec')
      }}
    />
  )
}

export default ob(RecSegement)
