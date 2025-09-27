/*
 * @Author: czy0729
 * @Date: 2024-10-07 07:18:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-07 07:45:30
 */
import React from 'react'
import { View } from 'react-native'
import { Image } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { GROUP_THUMB_MAP } from '@assets/images'
import { memoStyles } from './styles'

function FloorNew({ mini }: { mini?: boolean }) {
  const styles = memoStyles()
  return (
    <View style={stl(styles.image, mini && styles.mini)}>
      <Image
        src={GROUP_THUMB_MAP['circle']}
        size={mini ? 64 : 80}
        resizeMode='contain'
        placeholder={false}
        skeleton={false}
      />
    </View>
  )
}

export default ob(FloorNew)
