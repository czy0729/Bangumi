/*
 * @Author: czy0729
 * @Date: 2020-01-03 11:23:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-13 22:56:53
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { lastDate, getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import { HTMLDecode, removeHTMLTag } from '@utils/html'
import { EVENT } from '@constants'
import Cover from '../base/cover'
import Avatar from '../base/avatar'

const width = 64
const w = width * 2

function CatalogItem(
  {
    event,
    id,
    name,
    title,
    info,
    book,
    anime,
    music,
    game,
    real,
    isUser,
    children
  },
  { $, navigation }
) {
  if (!isUser && !book && !anime && !music && !game && !real) {
    return null
  }

  const styles = memoStyles()
  const { list, collect, content, avatar, userId, time } = $.catalogDetail(id)
  const desc = HTMLDecode(removeHTMLTag(info || content))
  const date = time ? lastDate(getTimestamp(time)).slice(0, 10) : ''
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
          catalogId: id
        })
      }}
    >
      <Flex style={styles.wrap} align='start'>
        <View style={styles.catalog}>
          <View
            style={[
              styles.catalogLine,
              styles.catalogLevel2,
              {
                width: w,
                height: w - 15
              }
            ]}
          />
          <View
            style={[
              styles.catalogLine,
              styles.catalogLevel1,
              {
                width: w,
                height: w - 7
              }
            ]}
          />
          <Flex style={styles.thumbs} wrap='wrap'>
            {list
              .filter((item, index) => index < 3)
              .map(item => (
                <Cover
                  key={item.id}
                  size={width}
                  src={item.image}
                  placeholder={false}
                />
              ))}
            {!!list.length && (
              <Flex style={styles.num} justify='center' align='center'>
                <Text size={13} bold>
                  +{list.length}
                </Text>
              </Flex>
            )}
          </Flex>
        </View>
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
                  {desc}
                </Text>
              )}
              {!!collect && (
                <Text style={_.mt.xs} size={10} lineHeight={14} type='sub'>
                  {collect}人收藏
                </Text>
              )}
            </View>
            <Flex style={_.mt.md}>
              <Avatar
                key={avatar}
                style={_.mr.sm}
                navigation={navigation}
                size={20}
                userId={userId}
                name={name}
                src={avatar}
                event={event}
              />
              <Text size={12} bold>
                {HTMLDecode(name)}
              </Text>
              <Text style={_.ml.xs} size={10} type='sub'>
                {date}
              </Text>
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
      {children}
    </Touchable>
  )
}

CatalogItem.defaultProps = {
  event: EVENT
}

CatalogItem.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(CatalogItem)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  wrap: {
    paddingVertical: _.space,
    paddingRight: _.wind
  },
  content: {
    height: w,
    paddingVertical: _.sm,
    paddingLeft: 24
  },
  catalog: {
    width: w,
    height: w
  },
  num: {
    width,
    height: width
  },
  catalogLine: {
    position: 'absolute',
    right: 0,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: _.colorBorder
  },
  catalogLevel1: {
    zIndex: 2,
    top: 4,
    marginRight: -7
  },
  catalogLevel2: {
    zIndex: 1,
    top: 8,
    marginRight: -12
  },
  thumbs: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: 0,
    width: w + 2,
    height: w + 2,
    backgroundColor: _.select(_.colorPlain, _.colorBg),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: 3,
    overflow: 'hidden'
  }
}))
