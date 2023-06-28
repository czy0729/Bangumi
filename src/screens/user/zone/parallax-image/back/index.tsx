/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:50:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 09:51:56
 */
import React from 'react'
import { View } from 'react-native'
import { IconBack } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'

function Back(props, { navigation }: Ctx) {
  return (
    <View style={[_.header.left, styles.back]}>
      <IconBack navigation={navigation} color={_.__colorPlain__} />
    </View>
  )
}

export default obc(Back)
