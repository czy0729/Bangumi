/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:46:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:02:43
 */
import React from 'react'
import { View } from 'react-native'
import { getUserStatus, Image } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Avatar() {
  const { $ } = useStore<Ctx>()
  const { avatar, username } = $.usersInfo
  const fallback = typeof $.src === 'string' && !$.src.includes('//lain.bgm.tv/pic/user/l/')
  const userStatus = getUserStatus(username)
  const size = _.r(88)
  return (
    <View>
      <Image
        key={String($.src)}
        style={styles.avatar}
        src={$.src}
        size={size}
        radius={size / 2}
        placeholder={false}
        border={_.__colorPlain__}
        borderWidth={2}
        fallback={fallback}
        fallbackSrc={avatar?.large}
      />
      {!!userStatus && (
        <View style={[styles.status, styles.online, styles[`online${userStatus}`]]} />
      )}
    </View>
  )
}

export default ob(Avatar)
