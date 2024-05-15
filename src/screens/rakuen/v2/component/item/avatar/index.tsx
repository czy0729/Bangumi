/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-15 12:27:43
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as AvatarComp } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { EVENT } from './ds'
import { styles } from './styles'

function Avatar({ avatar, userName, userId, priority }, { navigation }: Ctx) {
  return (
    <View style={styles.avatar}>
      <AvatarComp
        navigation={navigation}
        src={avatar}
        name={userName}
        userId={userId}
        priority={priority}
        event={EVENT}
      />
    </View>
  )
}

export default obc(Avatar)
