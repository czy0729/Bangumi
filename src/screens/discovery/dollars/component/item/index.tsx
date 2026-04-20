/*
 * @Author: czy0729
 * @Date: 2023-04-26 17:17:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-05 14:27:29
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, UserStatus } from '@components'
import { Avatar, InView, Popover } from '@_'
import { _, useStore } from '@stores'
import { appNavigate, date, HTMLDecode } from '@utils'
import { extractIdFromAvatar } from '@utils/app/ages'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import { extractLinks } from './utils'
import { COMPONENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'

import type { DollarsItem } from '@stores/discovery/types'
import type { WithIndex } from '@types'
import type { Ctx } from '../../types'

function Item({ index, id, avatar, nickname, msg, color }: WithIndex<DollarsItem>) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const src = `${HOST}/pic/user/l/${avatar}` as const
  const userId = extractIdFromAvatar(src)
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
      userId,
      _name: nickname,
      _image: src
    })
  }, [navigation, nickname, src, userId])

  const styles = memoStyles()

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
        <Text style={styles.time} type='__plain__' size={12} bold shadow>
          {date('H:i', id.slice(0, 10))}
          {'  '}
        </Text>
      </View>
    ),
    [color, content, id, styles]
  )

  const memoData = useMemo(() => links.map(item => item.text), [links])

  const handleSelect = useCallback(
    (_label: string, index: number) => {
      const url = links[index]?.url
      if (url) appNavigate(url, navigation)
    },
    [links, navigation]
  )

  return (
    <Flex style={styles.item} align='start'>
      <Flex style={styles.avatar} direction='column'>
        <UserStatus userId={userId}>
          <InView style={styles.inView} y={ITEM_HEIGHT * (index + 1)}>
            <UserStatus userId={userId}>
              <Avatar
                src={src}
                size={48}
                borderWidth={2}
                borderColor={_.select(_.colorBorder, 'rgba(255, 255, 255, 0.88)')}
                radius={_.radiusSm}
                onPress={handlePress}
                onLongPress={handleLongPress}
              />
            </UserStatus>
          </InView>
        </UserStatus>
        <Text style={_.mt.sm} size={nickname.length >= 8 ? 10 : 11} bold align='center'>
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
}

export default observer(Item)
