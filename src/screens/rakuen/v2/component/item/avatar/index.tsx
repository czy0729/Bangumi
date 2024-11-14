/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:24:06
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as AvatarComp } from '@_'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { EVENT } from './ds'
import { styles } from './styles'

function Avatar({ avatar, userName, userId, priority }) {
  const navigation = useNavigation()
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

export default ob(Avatar)
