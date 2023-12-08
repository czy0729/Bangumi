/*
 * @Author: czy0729
 * @Date: 2023-10-31 16:22:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-06 04:24:56
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { styles } from './styles'

const DS = ['数量', '排名'] as const

function RecSegement(props, { $ }: Ctx) {
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

export default obc(RecSegement)
