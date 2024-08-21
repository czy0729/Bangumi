/*
 * @Author: czy0729
 * @Date: 2020-01-03 11:23:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 18:46:04
 */
import React from 'react'
import { Component, Flex, Touchable } from '@components'
import { _, discoveryStore } from '@stores'
import { getTimestamp, HTMLDecode, lastDate, removeHTMLTag } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import { InView } from '../../base'
import Covers from './covers'
import Desc from './desc'
import Title from './title'
import { COMPONENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'
import { Context, Props as ItemCatalogProps } from './types'

export { ItemCatalogProps }

export const ItemCatalog = obc(
  (
    {
      event = EVENT,
      index,
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
      last,
      isUser,
      hideScore = false,
      filter,
      detail,
      children
    }: ItemCatalogProps,
    { navigation }: Context
  ) => {
    if (!isUser && !book && !anime && !music && !game && !real) return null

    const styles = memoStyles()
    const detailValue = detail || discoveryStore.catalogDetail(id)
    const oss = discoveryStore.catalogDetailFromOSS(id)
    let data: any
    if (detailValue._loaded && detailValue.list.length) {
      data = detailValue
    } else if (oss._loaded) {
      data = oss
    } else {
      data = detailValue
    }

    const { list, collect, content, avatar, userId, time: _detailTime } = data
    const avatarValue = avatar || data?.avatar
    const userIdValue = userId || data?.userId
    const nameValue = HTMLDecode(name || userName || data?.nickname)
    const collectValue = collect || data?.collect
    const titleValue = HTMLDecode(title || data?.title)
    let desc = HTMLDecode(removeHTMLTag(info || content || data?.desc || oss?.info, false)).replace(
      /\n/g,
      ' '
    )
    if (desc === 'undefined') desc = ''

    let date = ''
    let lastUpdate = ''
    if (last) {
      date = `创建于 ${last}`
    } else if (time && !time.includes('创建于')) {
      date = `最后更新 ${lastDate(getTimestamp(time))}`
      lastUpdate = time
    } else if (_detailTime) {
      date = `创建于 ${lastDate(getTimestamp(_detailTime))?.slice(0, 10)}`
    }

    return (
      <Component id='item-catalog' data-key={id}>
        <Touchable
          style={styles.container}
          animate
          onPress={() => {
            navigation.push('CatalogDetail', {
              catalogId: id,
              _lastUpdate: lastUpdate,
              _hideScore: hideScore
            })

            t(event.id, {
              to: 'CatalogDetail',
              catalogId: id,
              ...event.data
            })
          }}
        >
          <Flex style={styles.wrap} align='start'>
            <InView style={styles.inView} y={ITEM_HEIGHT * index + 1}>
              <Covers
                list={list
                  .filter((_: any, index: number) => index < 3)
                  .map((item: { id: any; image: any }) => ({
                    id: item.id,
                    image: item.image
                  }))}
                total={Math.max(oss?.total || 0, list?.length || 0)}
              />
            </InView>
            <Flex.Item>
              <Flex style={styles.content} direction='column' justify='between' align='start'>
                <Title title={titleValue} desc={desc} collect={collectValue} filter={filter} />
                <Desc
                  navigation={navigation}
                  userId={userIdValue}
                  avatar={avatarValue}
                  name={nameValue}
                  date={date}
                  event={event}
                />
              </Flex>
            </Flex.Item>
          </Flex>
          {children}
        </Touchable>
      </Component>
    )
  },
  COMPONENT
)

export default ItemCatalog
