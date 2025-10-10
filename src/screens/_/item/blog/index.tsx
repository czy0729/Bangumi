/*
 * @Author: czy0729
 * @Date: 2020-03-22 15:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-10 17:43:18
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Component, Cover, Divider, Flex, Link, Text } from '@components'
import { _, discoveryStore } from '@stores'
import { findSubjectCn, HTMLDecode, stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { EVENT, IMG_HEIGHT_SM, IMG_WIDTH_SM } from '@constants'
import { InView } from '../../base/in-view'
import BtnPopover from './btn-popover'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemBlogProps } from './types'

export { ItemBlogProps }

export const ItemBlog = ({
  style,
  index = 0,
  id,
  cover,
  title,
  content,
  username,
  subject,
  typeCn,
  time,
  replies,
  tags = [],
  event = EVENT
}: ItemBlogProps) => {
  r(COMPONENT)

  const line = useMemo(() => {
    const arr = []
    if (username) arr.push(username)
    if (subject) arr.push(findSubjectCn(subject, id))
    if (time) arr.push(time)
    return arr.length ? HTMLDecode(arr.join(' · ')) : ''
  }, [id, subject, time, username])

  return useObserver(() => {
    const styles = memoStyles()
    const readed = discoveryStore.blogReaded(id)
    const height = IMG_HEIGHT_SM

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

    return (
      <Component id='item-blog' data-key={id}>
        <View style={stl(styles.container, style, readed && styles.readed)}>
          <Flex style={styles.wrap} align='start'>
            {!!cover && (
              <InView style={styles.inView} y={height * 1.5 * (index + 1)}>
                <Cover
                  src={cover}
                  width={IMG_WIDTH_SM}
                  height={cover.includes('/user/') ? IMG_WIDTH_SM : height}
                  radius
                  type={typeCn}
                />
              </InView>
            )}

            <Flex.Item>
              <Flex align='start'>
                <Flex.Item>
                  <Link {...linkProps}>
                    <Text size={14} numberOfLines={2} bold>
                      {HTMLDecode(title)}
                      {replies !== '+0' && (
                        <Text size={12} type='main' lineHeight={14} bold>
                          {'  '}
                          {replies}
                        </Text>
                      )}
                    </Text>

                    {!!line && (
                      <Text style={_.mt.xs} type='sub' size={12} bold>
                        {line}
                      </Text>
                    )}
                  </Link>
                </Flex.Item>
                <BtnPopover id={id} title={title} />
              </Flex>

              <Link style={_.mt.sm} {...linkProps}>
                <Text size={13} lineHeight={15} numberOfLines={4}>
                  {HTMLDecode(content)}
                </Text>
              </Link>

              {!!tags.length && (
                <Flex style={_.mt.md}>
                  <Flex.Item />
                  <Text style={stl(styles.tags, readed && styles.tagsBorder)} size={13}>
                    tags: {typeof tags === 'string' ? tags : tags.join(' ')}
                  </Text>
                </Flex>
              )}
            </Flex.Item>
          </Flex>
        </View>

        <Divider />
      </Component>
    )
  })
}

export default ItemBlog
