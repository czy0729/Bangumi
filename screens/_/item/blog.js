/*
 * @Author: czy0729
 * @Date: 2020-03-22 15:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-04 21:42:12
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Image } from '@components'
import { _, discoveryStore } from '@stores'
import { t } from '@utils/fetch'
import { findBangumiCn } from '@utils/app'
import { EVENT } from '@constants'

const imgWidth = 80

function ItemBlog(
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
    tags,
    event
  },
  { navigation }
) {
  const styles = memoStyles()
  const readed = discoveryStore.blogReaded(id)
  const line = []
  if (username) line.push(username)
  if (subject) line.push(findBangumiCn(subject))
  if (time) line.push(time)
  return (
    <Touchable
      style={[styles.container, readed && styles.readed, style]}
      onPress={() => {
        const { eventId, eventData } = event
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
      <Flex align='start' style={[styles.wrap, index !== 0 && styles.border]}>
        {!!cover && (
          <View style={styles.imgContainer}>
            <Image
              src={cover}
              width={imgWidth}
              height={imgWidth}
              placeholder={false}
              shadow
            />
          </View>
        )}
        <Flex.Item>
          <Text size={15} numberOfLines={2} bold>
            {title}{' '}
            <Text size={12} type='main' lineHeight={15}>
              {replies}
            </Text>
          </Text>
          {!!line.length && (
            <Text style={_.mt.xs} type='sub' size={13}>
              {line.join(' / ')}
            </Text>
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

ItemBlog.defaultProps = {
  tags: [],
  event: EVENT
}

ItemBlog.contextTypes = {
  navigation: PropTypes.object
}

export default observer(ItemBlog)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  readed: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  imgContainer: {
    width: imgWidth,
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
