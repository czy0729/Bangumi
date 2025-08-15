/*
 * @Author: czy0729
 * @Date: 2023-04-26 17:17:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-14 18:23:51
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Flex, Text, UserStatus } from '@components'
import { Avatar, InView, Popover } from '@_'
import { _, useStore } from '@stores'
import { appNavigate, HTMLDecode } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { HOST } from '@constants'
import { Ctx } from '../../types'
import { extractLinks } from './utils'
import { COMPONENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'

function Item({ index, avatar, nickname, msg, color }) {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()
  const userId = String(avatar).match(/\/(\d+)\.jpg/)?.[1]
  const content = HTMLDecode(msg).replace(/<br \/>/g, '')
  const links = extractLinks(content)

  const handlePress = useCallback(() => {
    $.onToggleShow(nickname)
  }, [$, nickname])
  const handleLongPress = useCallback(() => {
    if (!userId) return

    navigation.push('Zone', {
      userId
    })

    t('Dollars.跳转', {
      to: 'Zone',
      userId
    })
  }, [navigation, userId])

  return useObserver(() => {
    const styles = memoStyles()
    const userId = String(avatar).match(/\/(\d+)\.jpg/)?.[1]

    const elContent = useMemo(
      () => (
        <View
          style={[
            styles.content,
            {
              backgroundColor: color || 'transparent'
            }
          ]}
        >
          <Text type='__plain__' lineHeight={17} numberOfLines={12} bold shadow selectable>
            {content}
          </Text>
        </View>
      ),
      [styles.content]
    )
    const memoData = useMemo(() => links.map(item => item.text), [])
    const handleSelect = useCallback((_label: string, index: number) => {
      const url = links[index]?.url
      if (url) appNavigate(url, navigation)
    }, [])

    return (
      <Flex style={styles.item} align='start'>
        <Flex style={styles.avatar} direction='column'>
          <UserStatus userId={userId}>
            <InView style={styles.inView} y={ITEM_HEIGHT * (index + 1)}>
              <Avatar
                src={`${HOST}/pic/user/l/${avatar}`}
                size={48}
                borderWidth={2}
                borderColor={_.select(_.colorBorder, 'rgba(255, 255, 255, 0.88)')}
                radius={_.radiusSm}
                onPress={handlePress}
                onLongPress={handleLongPress}
              />
            </InView>
          </UserStatus>
          <Text style={_.mt.sm} size={11} bold align='center'>
            {nickname}
          </Text>
        </Flex>
        <Flex.Item>
          {memoData.length ? (
            <Popover data={memoData} onSelect={handleSelect}>
              {elContent}
            </Popover>
          ) : (
            elContent
          )}
        </Flex.Item>
      </Flex>
    )
  })
}

export default Item
