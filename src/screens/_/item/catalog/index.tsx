/*
 * @Author: czy0729
 * @Date: 2020-01-03 11:23:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 23:22:08
 *
 * 目录条目: 封面 / 标题描述 / 编纂者信息
 */
import { observer } from 'mobx-react'
import { Component, Flex, Link } from '@components'
import { r } from '@utils/dev'
import { EVENT } from '@constants'
import { InView, PreventTouchPlaceholder } from '../../base'
import Covers from './covers'
import Desc from './desc'
import { useCatalogData } from './hooks'
import Title from './title'
import {
  getCatalogCount,
  getCatalogDesc,
  getCatalogName,
  getCatalogTitle,
  isBadCatalog
} from './utils'
import { COMPONENT, ITEM_CATALOG_HEIGHT } from './ds'
import { memoStyles } from './styles'

export { ITEM_CATALOG_HEIGHT }

import type { Props as ItemCatalogProps } from './types'
export type { ItemCatalogProps }

export const ItemCatalog = observer(
  ({
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

    const { data, detailValue, oss, selfIds } = useCatalogData(id, detail)
    const { total, typeCn } = getCatalogCount(typeProps)

    // 过滤是否全为 0
    if (!isUser && total === 0) return null

    const styles = memoStyles()

    const { list, collect, content, avatar, userId, time: detailTime } = data

    // 坏目录: 别人创建且详情与云快照都确认没有任何条目 (显示为 +0), 不渲染; 自己创建的不受影响
    if (
      isBadCatalog({
        isUser,
        userId,
        selfIds,
        listLength: list.length,
        ossTotal: oss?.total,
        detailLoaded: !!detailValue._loaded,
        ossLoaded: !!oss?._loaded
      })
    ) {
      return null
    }

    const nameValue = getCatalogName(name, userName, data.nickname)
    const titleValue = getCatalogTitle(title, data.title)
    const desc = getCatalogDesc(info, content, oss?.info)

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
            <InView style={styles.inView} y={InView.y(index - 1, ITEM_CATALOG_HEIGHT)}>
              <Covers
                title={titleValue}
                list={list
                  .filter(item => !!item.image)
                  .slice(0, 3)
                  .map(item => ({
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
                  desc={desc}
                  collect={collect}
                  filter={filter}
                />
                <Desc
                  index={index}
                  userId={userId}
                  avatar={avatar}
                  name={nameValue}
                  date={last || time || detailTime}
                  event={event}
                />
              </Flex>
            </Flex.Item>
          </Flex>

          {children}
        </Link>

        <PreventTouchPlaceholder />
      </Component>
    )
  }
)

export default ItemCatalog
