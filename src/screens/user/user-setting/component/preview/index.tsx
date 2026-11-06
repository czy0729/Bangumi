/*
 * @Author: czy0729
 * @Date: 2024-01-22 01:06:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:08:58
 *
 * 背景 + 头像 + 昵称的预览区
 */
import { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Image, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { getHeaders } from '../utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Preview({ bg, avatar, blurRadius }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleExample = useCallback(() => {
    navigation.push('Zone', {
      userId: 'sukaretto'
    })
  }, [navigation])

  const styles = memoStyles()
  const { nickname, id, username } = $.usersInfo
  const userId = username || id

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
        <Text style={_.mt.sm} type='__plain__' size={12} shadow>
          {nickname}
          {!!userId && (
            <Text type='__plain__' size={12} shadow>
              {` @${userId}`}
            </Text>
          )}
        </Text>
      </Flex>

      <View style={styles.example}>
        <Touchable onPress={handleExample}>
          <Text type='__plain__' size={10} lineHeight={16} bold shadow>
            [示例]
          </Text>
        </Touchable>
      </View>
    </View>
  )
}

export default observer(Preview)
