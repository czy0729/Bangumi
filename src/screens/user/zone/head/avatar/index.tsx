/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:46:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 09:17:35
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, getUserStatus } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'

function Avatar(props, { $ }: Ctx) {
  const { avatar, username } = $.usersInfo
  const fallback =
    typeof $.src === 'string' && !$.src.includes('//lain.bgm.tv/pic/user/l/')
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
        border={_.__colorPlain__}
        borderWidth={2}
        shadow
        fallback={fallback}
        fallbackSrc={avatar?.large}
      />
      {!!userStatus && (
        <Flex style={styles.status} justify='center'>
          <View style={[styles.online, styles[`online${userStatus}`]]} />
        </Flex>
      )}
    </View>
  )
}

export default obc(Avatar)
