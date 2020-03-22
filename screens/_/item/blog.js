/*
 * @Author: czy0729
 * @Date: 2020-03-22 15:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-22 17:03:54
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Image } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { IOS, EVENT } from '@constants'

const imgWidth = 80

function ItemBlog(
  { index, id, cover, title, content, time, replies, tags, event },
  { navigation }
) {
  const styles = memoStyles()
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        const { eventId, eventData } = event
        t(eventId, {
          to: 'Blog',
          subjeblogIdctId: id,
          ...eventData
        })

        navigation.push('Blog', {
          blogId: id,
          _title: title,
          _time: time
        })
      }}
    >
      <Flex align='start' style={[styles.wrap, index !== 0 && styles.border]}>
        {!!cover && (
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              src={cover}
              width={imgWidth}
              height={imgWidth}
              placeholder={false}
              shadow={IOS}
            />
          </View>
        )}
        <Flex.Item>
          <Text size={15} numberOfLines={2}>
            {title}
          </Text>
          <Text style={_.mt.xs} type='sub' size={13}>
            {time}{' '}
            <Text size={12} type='main'>
              {replies}
            </Text>
          </Text>
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
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(ItemBlog)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  imgContainer: {
    width: imgWidth,
    marginRight: _.wind
  },
  wrap: {
    paddingVertical: _.wind,
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
