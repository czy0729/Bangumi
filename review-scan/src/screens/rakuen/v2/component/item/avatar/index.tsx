/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-16 15:27:24
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as AvatarComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Avatar({ avatar, userName, userId, priority }) {
  const { $, navigation } = useStore<Ctx>()
  return (
    <View style={styles.avatar}>
      <AvatarComp
        src={avatar}
        userId={userId}
        name={userName}
        priority={priority}
        onPress={() => {
          if ($.state.swiping) return

          navigation.push('Zone', {
            userId,
            _id: userId,
            _name: userName,
            _image: avatar
          })

          t('超展开.跳转', {
            to: 'Zone',
            userId
          })
        }}
      />
    </View>
  )
}

export default ob(Avatar)
