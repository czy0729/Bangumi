/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:05:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:19:39
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { useStore } from '@stores'
import { styles } from './styles'

import type { Ctx } from '../../types'

function IconDisc() {
  const { $ } = useStore<Ctx>()

  return (
    <IconTouchable style={styles.disc} name='md-g-translate' size={18} onPress={$.doDiscTranslate}>
      <Heatmap id='条目.翻译曲目' />
    </IconTouchable>
  )
}

export default observer(IconDisc)
