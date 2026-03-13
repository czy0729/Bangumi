/*
 * @Author: czy0729
 * @Date: 2020-01-03 11:23:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-01 00:14:32
 */
import React from 'react'
import { Component, Flex, Touchable } from '@components'
import { discoveryStore } from '@stores'
import { getTimestamp, HTMLDecode, lastDate, removeHTMLTag } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { EVENT } from '@constants'
import { SubjectTypeCn } from '@types'
import { InView } from '../../base'
import Covers from './covers'
import Desc from './desc'
import Title from './title'
import { COMPONENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemCatalogProps } from './types'

export { ItemCatalogProps }

export const ItemCatalog = ob(
  ({
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
  }: ItemCatalogProps) => {
    const navigation = useNavigation()
    if (!isUser && !anime && !book && !game && !real && !music) return null

    const styles = memoStyles()
    const max = Math.max(anime || 0, book || 0, music || 0, game || 0, real || 0)
    let typeCn: SubjectTypeCn
    if (max === anime) {
      typeCn = '动画'
    } else if (max === book) {
      typeCn = '书籍'
    } else if (max === game) {
      typeCn = '游戏'
    } else if (max === real) {
      typeCn = '三次元'
    } else if (max === music) {
      typeCn = '音乐'
    }

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
    try {
      if (last) {
        date = `创建于 ${last}`
      } else if (time && !time.includes('创建于')) {
        date = `最后更新 ${lastDate(getTimestamp(time))}`
        lastUpdate = time
      } else if (_detailTime) {
        date = `创建于 ${lastDate(getTimestamp(_detailTime.split(' ')?.[0]))?.slice(0, 10)}`
      }
    } catch (error) {}

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
            <InView style={styles.inView} y={ITEM_HEIGHT * (index + 1)}>
              <Covers
                title={titleValue}
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
                <Title
                  title={titleValue}
                  typeCn={typeCn}
                  desc={desc}
                  collect={collectValue}
                  filter={filter}
                />
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
