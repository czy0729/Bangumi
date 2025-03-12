/*
 * @Author: czy0729
 * @Date: 2024-01-22 01:06:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:48:53
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { getHeaders } from '../utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Preview({ bg, avatar, blurRadius }: { bg: string; avatar: string; blurRadius: number }) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { nickname, id, username } = $.usersInfo

  return (
    <View style={styles.preview}>
      <Image
        key={bg}
        style={styles.blurView}
        src={bg}
        headers={getHeaders(bg)}
        width={_.window.contentWidth}
        height={styles.preview.height}
        blurRadius={blurRadius}
        fallback={!!blurRadius}
        errorToHide
      />
      <Flex style={styles.mask} direction='column' justify='center'>
        <Image
          key={avatar}
          style={styles.avatar}
          src={avatar}
          headers={getHeaders(avatar)}
          size={64}
          radius={32}
          border={_.__colorPlain__}
          borderWidth={1.5}
          placeholder={false}
          fallback
          errorToHide
        />
        <Text style={_.mt.sm} type={_.select('plain', 'title')} size={12}>
          {nickname}
          <Text type={_.select('plain', 'title')} size={12}>
            {' '}
            {username || id ? `@${username || id} ` : ''}
          </Text>
        </Text>
      </Flex>
      <View style={styles.example}>
        <Touchable
          onPress={() => {
            navigation.push('Zone', {
              userId: 'sukaretto'
            })
          }}
        >
          <Text size={10} lineHeight={16} bold type='__plain__'>
            [示例]
          </Text>
        </Touchable>
      </View>
    </View>
  )
}

export default ob(Preview, COMPONENT)
