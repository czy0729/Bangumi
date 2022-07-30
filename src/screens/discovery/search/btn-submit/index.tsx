/*
 * @Author: czy0729
 * @Date: 2022-01-10 11:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 13:37:33
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

function BtnSubmit(props, { $, navigation }: Ctx) {
  return (
    <View style={_.ml.sm}>
      <Button
        style={styles.btn}
        type='ghostPlain'
        size='sm'
        onPress={() => $.onSubmit(navigation)}
      >
        {$.isUser ? '前往' : '查询'}
      </Button>
      <Heatmap id='搜索.搜索' />
    </View>
  )
}

export default obc(BtnSubmit)
