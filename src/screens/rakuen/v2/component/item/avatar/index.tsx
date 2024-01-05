/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 23:19:58
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as CompAvatar } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { EVENT } from './ds'
import { styles } from './styles'

function Avatar({ avatar, userName, userId }, { navigation }: Ctx) {
  return (
    <View style={styles.avatar}>
      <CompAvatar
        navigation={navigation}
        src={avatar}
        name={userName}
        userId={userId}
        event={EVENT}
      />
    </View>
  )
}

export default obc(Avatar)
