/*
 * @Author: czy0729
 * @Date: 2020-09-08 12:09:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 23:45:36
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { IconHeader } from '@screens/_'

function Check({ $ }) {
  return (
    <View
      style={{
        marginRight: -8
      }}
    >
      <IconHeader name='md-check' onPress={$.onSave}>
        <Heatmap id='个人设置.保存' />
      </IconHeader>
    </View>
  )
}

export default Check
