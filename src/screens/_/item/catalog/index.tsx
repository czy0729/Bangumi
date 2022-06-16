/*
 * @Author: czy0729
 * @Date: 2020-01-03 11:23:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-16 23:54:31
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { lastDate, getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import { HTMLDecode, removeHTMLTag } from '@utils/html'
import { obc } from '@utils/decorators'
import { EVENT } from '@constants'
import { Cover, Avatar } from '../../base'
import { WIDTH, CATALOG_WIDTH, AVATAR_WIDTH } from './ds'
import { memoStyles } from './styles'
import { Props as ItemCatalogProps } from './types'

export { ItemCatalogProps }

export const ItemCatalog = obc(
  (
    {
      event = EVENT,
      id,
      name,
      title,
      info,
      book,
      anime,
      music,
      game,
      real,
      isUser,
      hideScore = false,
      children
    }: ItemCatalogProps,
    { $, navigation }
  ) => {
    if (!isUser && !book && !anime && !music && !game && !real) return null

    const styles = memoStyles()
    const { list, collect, content, avatar, userId, time } = $.catalogDetail(id)
    const desc = HTMLDecode(removeHTMLTag(info || content))
    const date = time ? lastDate(getTimestamp(time))?.slice(0, 10) : ''
    return (
      <Touchable
        style={styles.container}
        onPress={() => {
          const { id: eventId, data: eventData } = event
          t(eventId, {
            to: 'CatalogDetail',
            catalogId: id,
            ...eventData
          })

          navigation.push('CatalogDetail', {
            catalogId: id,
            _hideScore: hideScore
          })
        }}
      >
        <Flex style={styles.wrap} align='start'>
          <View style={styles.catalog}>
            <View
              style={[
                styles.catalogLine,
                styles.catalogLevel2,
                {
                  width: CATALOG_WIDTH,
                  height: CATALOG_WIDTH - 15
                }
              ]}
            />
            <View
              style={[
                styles.catalogLine,
                styles.catalogLevel1,
                {
                  width: CATALOG_WIDTH,
                  height: CATALOG_WIDTH - 7
                }
              ]}
            />
            <Flex style={styles.thumbs} wrap='wrap'>
              {list
                .filter((item, index) => index < 3)
                .map(item => (
                  <Cover
                    key={item.id}
                    size={WIDTH}
                    src={item.image}
                    placeholder={false}
                  />
                ))}
              {!!list.length && (
                <Flex style={styles.num} justify='center' align='center'>
                  <Text size={13} bold>
                    +{list.length}
                  </Text>
                </Flex>
              )}
            </Flex>
          </View>
          <Flex.Item>
            <Flex
              style={styles.content}
              direction='column'
              justify='between'
              align='start'
            >
              <View>
                <Text bold>{HTMLDecode(title)}</Text>
                {!!desc && desc !== title && (
                  <Text style={_.mt.sm} size={12} numberOfLines={3}>
                    {desc}
                  </Text>
                )}
                {!!collect && (
                  <Text style={_.mt.xs} size={10} lineHeight={14} type='sub' bold>
                    {collect}人收藏
                  </Text>
                )}
              </View>
              <Flex style={_.mt.md}>
                <Avatar
                  key={avatar}
                  style={_.mr.sm}
                  navigation={navigation}
                  size={AVATAR_WIDTH}
                  userId={userId}
                  name={name}
                  src={avatar}
                  event={event}
                />
                <Flex.Item>
                  {!!name && (
                    <Text style={_.mb.xxs} size={12} bold numberOfLines={1}>
                      {HTMLDecode(name)}
                    </Text>
                  )}
                  <Text size={10} type='sub'>
                    {date}
                  </Text>
                </Flex.Item>
              </Flex>
            </Flex>
          </Flex.Item>
        </Flex>
        {children}
      </Touchable>
    )
  }
)
