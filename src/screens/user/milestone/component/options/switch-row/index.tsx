/*
 * @Author: czy0729
 * @Date: 2026-08-29 04:55:22
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-29 04:55:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import { SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { styles } from './styles'

import type { Props } from './types'

/** 开关设置行 */
function SwitchRow({ hd, information, value, onSyncPress, style }: Props) {
  return (
    <ItemSetting
      style={style}
      hd={hd}
      information={information}
      ft={<SwitchPro style={styles.switch} value={value} onSyncPress={onSyncPress} />}
    />
  )
}

export default observer(SwitchRow)
