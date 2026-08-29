/*
 * @Author: czy0729
 * @Date: 2024-10-30 15:16:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 06:47:44
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function T2S() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!systemStore.setting.s2t) return null

  return (
    <Touchable style={styles.touch} onPress={$.onT2S}>
      <Text bold>{$.state.t2s ? '简' : '繁'}</Text>
    </Touchable>
  )
}

export default observer(T2S)
