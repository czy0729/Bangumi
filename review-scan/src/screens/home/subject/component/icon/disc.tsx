/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:05:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:47:15
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'

function IconDisc() {
  const { $ } = useStore<Ctx>()
  return (
    <IconTouchable style={styles.disc} name='md-g-translate' size={18} onPress={$.doDiscTranslate}>
      <Heatmap id='条目.翻译曲目' />
    </IconTouchable>
  )
}

export default ob(IconDisc)
