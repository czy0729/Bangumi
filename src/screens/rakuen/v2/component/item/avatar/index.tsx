/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 条目头像
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar as AvatarComp, Text } from '@components'
import { _, systemStore, useStore } from '@stores'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Avatar({ src, name, userId, priority, text }: Props) {
  const { navigation } = useStore<Ctx>()

  const styles = memoStyles()

  if (!src) {
    return (
      <View style={styles.avatar}>
        <View
          style={[
            styles.placeholder,
            { borderRadius: systemStore.setting.avatarRound ? _.r(40) : _.radiusSm }
          ]}
        >
          <Text size={16} bold type='sub'>
            {text}
          </Text>
        </View>
      </View>
    )
  }

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
