/*
 * @Author: czy0729
 * @Date: 2024-10-30 15:16:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:53:52
 */
import React from 'react'
import { Text, Touchable } from '@components'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function T2S({ $ }: Ctx) {
  if (!systemStore.setting.s2t) return null

  return (
    <Touchable style={styles.touch} onPress={$.onT2S}>
      <Text bold>{$.state.t2s ? '简' : '繁'}</Text>
    </Touchable>
  )
}

export default ob(T2S, COMPONENT)
