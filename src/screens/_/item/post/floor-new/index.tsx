/*
 * @Author: czy0729
 * @Date: 2024-10-07 07:18:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 22:24:39
 */
import React from 'react'
import { View } from 'react-native'
import { Image } from '@components'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { GROUP_THUMB_MAP } from '@assets/images'
import { memoStyles } from './styles'

import type { Props } from './types'

function FloorNew({ isMini }: Props) {
  return useObserver(() => {
    const styles = memoStyles()

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
  })
}

export default FloorNew
