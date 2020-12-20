/*
 * @Author: czy0729
 * @Date: 2020-09-08 12:09:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-20 19:35:13
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
      <IconHeader name='check-simple' onPress={$.onSave}>
        <Heatmap id='个人设置.保存' />
      </IconHeader>
    </View>
  )
}

export default Check
