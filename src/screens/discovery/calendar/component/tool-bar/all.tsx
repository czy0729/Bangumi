/*
 * @Author: czy0729
 * @Date: 2024-08-09 07:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 03:57:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { styles } from './styles'

import type { Ctx } from '../../types'

function All() {
  const { $ } = useStore<Ctx>()

  return (
    <Touchable style={styles.touch} onPress={$.onToggleExpand}>
      <Iconfont
        name={$.state.expand ? 'md-radio-button-on' : 'md-radio-button-off'}
        size={15}
        color={_.colorDesc}
      />
    </Touchable>
  )
}

export default observer(All)
