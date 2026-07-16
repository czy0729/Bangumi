/*
 * @Author: czy0729
 * @Date: 2024-10-07 07:18:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:26:44
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { stl } from '@utils'
import { GROUP_THUMB_MAP } from '@assets/images'
import { styles } from './styles'

import type { Props } from './types'

function FloorNew({ isMini }: Props) {
  return (
    <View style={stl(styles.image, isMini && styles.mini)}>
      <Image
        src={GROUP_THUMB_MAP['circle']}
        size={isMini ? 64 : 80}
        resizeMode='contain'
        placeholder={false}
        skeleton={false}
      />
    </View>
  )
}

export default observer(FloorNew)
