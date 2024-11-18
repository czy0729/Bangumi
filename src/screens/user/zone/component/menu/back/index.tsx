/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:50:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:04:22
 */
import React from 'react'
import { View } from 'react-native'
import { IconBack } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { styles } from './styles'

function Back() {
  const navigation = useNavigation()
  return (
    <View style={[_.header.left, styles.back]}>
      <IconBack navigation={navigation} color={_.__colorPlain__} />
    </View>
  )
}

export default ob(Back)
