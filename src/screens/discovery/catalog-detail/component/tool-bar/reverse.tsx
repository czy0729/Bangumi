/*
 * @Author: czy0729
 * @Date: 2024-10-24 21:04:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-25 02:45:33
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Reverse() {
  const { $ } = useStore<Ctx>()

  return (
    <ToolBar.Icon
      iconStyle={$.state.reverse ? styles.forward : styles.reverse}
      icon='md-arrow-back'
      onSelect={$.onReverse}
    />
  )
}

export default observer(Reverse)
