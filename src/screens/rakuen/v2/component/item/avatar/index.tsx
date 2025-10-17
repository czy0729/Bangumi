/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 09:28:46
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as AvatarComp } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Avatar({ src, name, userId, priority }: Props) {
  const { navigation } = useStore<Ctx>()

  return useObserver(() => (
    <View style={styles.avatar}>
      <AvatarComp
        navigation={navigation}
        src={src}
        userId={userId}
        name={name}
        priority={priority}
        params={{
          _id: userId,
          _name: name,
          _image: src
        }}
        event={{
          id: '超展开.跳转',
          data: {
            to: 'Zone',
            userId
          }
        }}
      />
    </View>
  ))
}

export default Avatar
