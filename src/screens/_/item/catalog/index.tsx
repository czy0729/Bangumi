/*
 * @Author: czy0729
 * @Date: 2020-01-03 11:23:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 06:35:34
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, discoveryStore } from '@stores'
import { lastDate, getTimestamp, HTMLDecode, removeHTMLTag } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { EVENT } from '@constants'
import { Avatar } from '../../base'
import Covers from './covers'
import { AVATAR_WIDTH } from './ds'
import { memoStyles } from './styles'
import { Props as ItemCatalogProps } from './types'

export { ItemCatalogProps }

export const ItemCatalog = obc(
  (
    {
      event = EVENT,
      id,
      name,
      userName,
      title,
      info,
      book,
      anime,
      music,
      game,
      real,
      time,
      isUser,
      hideScore = false,
      children
    }: ItemCatalogProps,
    { navigation }
  ) => {
    if (!isUser && !book && !anime && !music && !game && !real) return null

    const styles = memoStyles()
    let data
    if (discoveryStore.catalogDetail(id)._loaded) {
      data = discoveryStore.catalogDetail(id)
    } else if (discoveryStore.catalogDetailFromOSS(id)._loaded) {
      data = discoveryStore.catalogDetailFromOSS(id)
    } else {
      data = discoveryStore.catalogDetail(id)
    }

    const { list, collect, content, avatar, userId, time: detailTime } = data
    let desc = info || content
    if (desc) desc = HTMLDecode(removeHTMLTag(info || content))

    let dateText = ''
    if (time && !time.includes('创建于')) {
      dateText = `最后更新 ${lastDate(getTimestamp(time))}`
    } else if (detailTime) {
      dateText = `创建于 ${lastDate(getTimestamp(detailTime))?.slice(0, 10)}`
    }
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
          <Covers list={list} />
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
                  <Text style={_.mt.sm} size={12} numberOfLines={2}>
                    {desc.replace(/\n/g, ' ')}
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
                  name={name || userName}
                  src={avatar}
                  event={event}
                />
                <Flex.Item>
                  {!!(name || userName) && (
                    <Text style={_.mb.xxs} size={12} bold numberOfLines={1}>
                      {HTMLDecode(name || userName)}
                    </Text>
                  )}
                  {!!dateText && (
                    <Text size={10} type='sub'>
                      {dateText}
                    </Text>
                  )}
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
