/*
 * @Author: czy0729
 * @Date: 2022-01-10 11:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-31 02:50:54
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Heatmap } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function BtnSubmit() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <View style={_.ml.sm}>
      <Button
        style={styles.btn}
        type='ghostPlain'
        size='sm'
        onPress={() => {
          $.onSubmit(navigation)
        }}
      >
        {$.isUser ? '前往' : '查询'}
      </Button>
      <Heatmap id='搜索.搜索' />
    </View>
  ))
}

export default BtnSubmit
