/*
 * @Author: czy0729
 * @Date: 2020-09-08 12:09:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-10 20:35:19
 */
import React from 'react'
import { View } from 'react-native'
import { IconHeader } from '@screens/_'

function Check({ $ }) {
  return (
    <View
      style={{
        marginRight: -8
      }}
    >
      <IconHeader name='check-simple' onPress={$.onSave} />
    </View>
  )
}

export default Check
