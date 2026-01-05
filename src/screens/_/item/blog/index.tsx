/*
 * @Author: czy0729
 * @Date: 2020-03-22 15:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-04 20:14:47
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Cover, Flex, Link, Text } from '@components'
import { _, discoveryStore } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { EVENT } from '@constants'
import { Tag } from '../../base'
import { InView } from '../../base/in-view'
import BtnPopover from './btn-popover'
import { COMPONENT, IMG_HEIGHT, IMG_WIDTH, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'

import type { Props as ItemBlogProps } from './types'
export type { ItemBlogProps }

export const ItemBlog = ({
  style,
  index = 0,
  id,
  cover,
  title,
  content,
  username,
  userId,
  subject,
  subjectId,
  typeCn,
  time,
  replies,
  tags = [],
  event = EVENT
}: ItemBlogProps) => {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    const linkProps = {
      path: 'Blog',
      getParams: () => ({
        blogId: id,
        _title: title
      }),
      eventId: event.id,
      getEventData: () => ({
        to: 'Blog',
        blogId: id,
        ...event.data
      }),
      onPress: () => {
        discoveryStore.updateBlogReaded(id)
      }
    } as const

    const subTextProps = {
      type: 'sub',
      size: 11,
      lineHeight: 13,
      numberOfLines: 1
    } as const

    const hasCover = !!cover
    const hasSub = !!(username || subject || time)
    const isReaded = discoveryStore.blogReaded(id)
    const isUserCover = hasCover && (cover.includes('/user/') || cover.includes('/photo/'))

    return (
      <Component id='item-blog' data-key={id}>
        <View style={stl(styles.item, style)}>
          <Flex style={stl(styles.main, isReaded && styles.readed)} align='start'>
            {hasCover && (
              <InView style={styles.inView} y={ITEM_HEIGHT * (index + 1)}>
                <Link {...linkProps}>
                  <Cover
                    src={cover}
                    width={IMG_WIDTH}
                    height={isUserCover ? IMG_WIDTH : IMG_HEIGHT}
                    radius={_.radiusXs}
                    type={typeCn}
                  />
                </Link>
              </InView>
            )}

            <Flex.Item>
              <Flex align='start'>
                <Flex.Item>
                  <Link {...linkProps}>
                    <Text lineHeight={15} numberOfLines={2} bold>
                      {HTMLDecode(title)}
                      {!!replies && (
                        <Text type='main' size={11} lineHeight={15} bold>
                          {'  '}
                          {replies}
                        </Text>
                      )}
                    </Text>
                  </Link>
                </Flex.Item>
                <BtnPopover id={id} title={title} />
              </Flex>

              <Link {...linkProps}>
                <Text style={styles.content} size={13} lineHeight={15} numberOfLines={4}>
                  {HTMLDecode(content)}
                </Text>
              </Link>

              {hasSub && (
                <Flex style={styles.sub}>
                  {!!username && (
                    <>
                      <Link
                        path='Zone'
                        params={{
                          userId
                        }}
                      >
                        <Text {...subTextProps}>{username}</Text>
                      </Link>
                      <Text {...subTextProps}> · </Text>
                    </>
                  )}
                  {!!subject && (
                    <>
                      <Link
                        style={{
                          flexShrink: 1
                        }}
                        path='Subject'
                        params={{
                          subjectId
                        }}
                      >
                        <Text {...subTextProps} ellipsizeMode='middle'>
                          {subject}
                        </Text>
                      </Link>
                      <Text {...subTextProps}> · </Text>
                    </>
                  )}
                  <Text {...subTextProps}>{time.slice(2)}</Text>

                  {!!tags.length &&
                    (typeof tags === 'string' ? (
                      <Tag style={_.ml.sm} type='plain' value={tags} />
                    ) : (
                      tags.map(item => <Tag key={item} style={_.ml.sm} type='plain' value={item} />)
                    ))}
                </Flex>
              )}
            </Flex.Item>
          </Flex>
        </View>
      </Component>
    )
  })
}

export default ItemBlog
