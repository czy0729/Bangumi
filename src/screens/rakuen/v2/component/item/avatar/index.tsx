/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar as AvatarComp } from '@components'
import { useStore } from '@stores'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Avatar({ src, name, userId, priority }: Props) {
  const { navigation } = useStore<Ctx>()

  return (
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
  )
}

export default observer(Avatar)
