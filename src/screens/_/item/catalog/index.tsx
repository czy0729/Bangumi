/*
 * @Author: czy0729
 * @Date: 2020-01-03 11:23:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-28 22:17:59
 */
import React from 'react'
import { Component, Flex, Link } from '@components'
import { discoveryStore } from '@stores'
import { HTMLDecode, removeHTMLTag } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { DATA_CATALOG_TYPE_MAP, EVENT } from '@constants'
import { InView } from '../../base'
import Covers from './covers'
import Desc from './desc'
import Title from './title'
import { COMPONENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'

import type { Props as ItemCatalogProps } from './types'

export type { ItemCatalogProps }

export const ItemCatalog = ({
  event = EVENT,
  index,
  id,
  name,
  userName,
  title,
  info,
  time,
  last,
  isUser,
  hideScore = false,
  filter,
  detail,
  children,
  ...typeProps
}: ItemCatalogProps) => {
  r(COMPONENT)

  return useObserver(() => {
    // 过滤是否全为 0
    const total = Object.keys(DATA_CATALOG_TYPE_MAP).reduce((sum, key) => {
      const v = (typeProps as any)[key] || 0
      return sum + v
    }, 0)
    if (!isUser && total === 0) return null

    const styles = memoStyles()

    // 求最大
    let maxKey: keyof typeof DATA_CATALOG_TYPE_MAP | null = null
    let maxValue = -Infinity
    for (const key in DATA_CATALOG_TYPE_MAP) {
      const v = (typeProps as any)[key] || 0
      if (v > maxValue) {
        maxValue = v
        maxKey = key as keyof typeof DATA_CATALOG_TYPE_MAP
      }
    }
    const typeCn = maxKey ? DATA_CATALOG_TYPE_MAP[maxKey] : undefined

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

    const { list, collect, content, avatar, userId, time: detailTime } = data
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

    return (
      <Component id='item-catalog' data-key={id}>
        <Link
          style={styles.container}
          path='CatalogDetail'
          getParams={() => ({
            catalogId: id,
            _lastUpdate: last || time || detailTime,
            _hideScore: hideScore
          })}
          eventId={event.id}
          getEventData={() => ({
            to: 'CatalogDetail',
            catalogId: id,
            ...event.data
          })}
        >
          <Flex style={styles.wrap} align='start'>
            <InView style={styles.inView} y={ITEM_HEIGHT * (index + 1)}>
              <Covers
                title={titleValue}
                list={list
                  .filter((_: any, index: number) => index < 3)
                  .map((item: { id: any; image: any }) => ({
                    id: item.id,
                    image: item.image
                  }))}
                total={Math.max(oss?.total || 0, list?.length || 0, total)}
                typeCn={typeCn}
              />
            </InView>
            <Flex.Item>
              <Flex style={styles.content} direction='column' justify='between' align='start'>
                <Title
                  title={titleValue}
                  typeCn={typeCn}
                  desc={desc.replace(/\r/g, '')}
                  collect={collectValue}
                  filter={filter}
                />
                <Desc
                  userId={userIdValue}
                  avatar={avatarValue}
                  name={nameValue}
                  date={last || time || detailTime}
                  event={event}
                />
              </Flex>
            </Flex.Item>
          </Flex>
          {children}
        </Link>
      </Component>
    )
  })
}

export default ItemCatalog
