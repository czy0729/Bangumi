/*
 * @Author: czy0729
 * @Date: 2020-03-22 15:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 11:49:29
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Katakana, Text } from '@components'
import { _, discoveryStore } from '@stores'
import { t } from '@utils/fetch'
import { findSubjectCn } from '@utils/app'
import { obc } from '@utils/decorators'
import { EVENT, IMG_WIDTH } from '@constants'
import { Cover } from '../base'

export const ItemBlog = obc(
  (
    {
      style,
      index,
      id,
      cover,
      title,
      content,
      username,
      subject,
      time,
      replies,
      tags = [],
      event = EVENT
    },
    { navigation }
  ) => {
    const styles = memoStyles()
    const readed = discoveryStore.blogReaded(id)
    const line = []
    if (username) line.push(username)
    if (subject) line.push(findSubjectCn(subject, id))
    if (time) line.push(time)
    return (
      <Touchable
        style={[styles.container, style, readed && styles.readed]}
        onPress={() => {
          const { id: eventId, data: eventData } = event
          t(eventId, {
            to: 'Blog',
            subjectId: id,
            ...eventData
          })

          discoveryStore.updateBlogReaded(id)
          navigation.push('Blog', {
            blogId: id,
            _title: title
          })
        }}
      >
        <Flex
          align='start'
          style={[styles.wrap, index !== 0 && !_.flat && styles.border]}
        >
          {!!cover && (
            <View style={styles.imgContainer}>
              <Cover src={cover} width={IMG_WIDTH} height={IMG_WIDTH} shadow />
            </View>
          )}
          <Flex.Item>
            <Text size={15} numberOfLines={2} bold>
              {title}{' '}
              {replies !== '+0' && (
                <Text size={12} type='main' lineHeight={15} bold>
                  {replies}
                </Text>
              )}
            </Text>
            {!!line.length && (
              <View style={_.mt.xs}>
                <Katakana.Provider size={13}>
                  <Katakana type='sub' size={13}>
                    {line.join(' / ')}
                  </Katakana>
                </Katakana.Provider>
              </View>
            )}
            <Text style={_.mt.sm} size={13} numberOfLines={4} lineHeight={15}>
              {content}
            </Text>
            {!!tags.length && (
              <Flex style={_.mt.sm}>
                <Flex.Item />
                <Text style={styles.tags} size={13}>
                  tags: {tags.join(' ')}
                </Text>
              </Flex>
            )}
          </Flex.Item>
        </Flex>
      </Touchable>
    )
  }
)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind
  },
  readed: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  imgContainer: {
    width: IMG_WIDTH,
    marginRight: _._wind
  },
  wrap: {
    paddingVertical: _.space,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  tags: {
    padding: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
