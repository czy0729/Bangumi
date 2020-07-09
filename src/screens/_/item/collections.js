/*
 * @Author: czy0729
 * @Date: 2019-05-25 23:00:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-07 20:58:32
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Katakana, Text, Touchable } from '@components'
import { _ } from '@stores'
import { getTimestamp } from '@utils'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { x18 } from '@utils/app'
import { EVENT, IMG_WIDTH, IMG_HEIGHT } from '@constants'
import Tag from '../base/tag'
import Stars from '../base/stars'
import Cover from '../base/cover'

function ItemCollections({
  navigation,
  index,
  id,
  cover,
  name,
  nameCn,
  tip,
  score,
  time,
  tags,
  comments,
  type,
  isCatalog,
  isCollect,
  isDo,
  isOnHold,
  isDropped,
  event
}) {
  const styles = memoStyles()
  const isFirst = index === 0
  const hasName = !!name
  const hasTip = !!tip
  const hasScore = !!score
  const hasComment = !!comments
  let days
  if (isDo || isOnHold || isDropped) {
    days = Math.ceil((getTimestamp() - getTimestamp(time)) / 86400)
  }

  const info = []
  if (isDo) info.push(`${days}天`)
  if (isOnHold) info.push(`搁置${days}天`)
  if (isDropped) info.push(`抛弃${days}天`)
  if (tags) {
    info.push(
      tags
        .replace(' ', '')
        .split(' ')
        .filter((item, index) => index < 2)
        .join(' ')
    )
  }

  return (
    <Touchable
      style={[
        _.container.item,
        styles.container,
        isCollect && styles.containerActive
      ]}
      onPress={() => {
        const { eventId, eventData } = event
        t(eventId, {
          to: 'Subject',
          subjectId: id,
          type: 'list',
          ...eventData
        })

        navigation.push('Subject', {
          subjectId: id,
          _jp: name,
          _cn: nameCn,
          _image: cover
        })
      }}
    >
      <Flex
        style={[styles.wrap, !isFirst && !_.flat && styles.border]}
        align='start'
      >
        <View style={styles.imgContainer}>
          <Cover
            style={styles.image}
            src={cover}
            width={IMG_WIDTH}
            height={IMG_HEIGHT}
            radius
            shadow
          />
        </View>
        <Flex.Item style={_.ml.wind}>
          <Flex
            style={[!isCatalog && styles.content]}
            direction='column'
            justify={isCatalog ? undefined : 'between'}
            align='start'
          >
            <Flex align='start'>
              <Flex.Item>
                <Katakana.Provider
                  itemStyle={styles.katakanas}
                  size={15}
                  numberOfLines={2}
                >
                  <Katakana size={15} bold>
                    {HTMLDecode(nameCn)}
                  </Katakana>
                  {hasName && name !== nameCn && (
                    <Katakana type='sub' size={11} lineHeight={15} bold>
                      {' '}
                      {HTMLDecode(name)}
                    </Katakana>
                  )}
                </Katakana.Provider>
              </Flex.Item>
              <Flex style={_.mt.xxs}>
                {x18(id, nameCn) && <Tag style={_.ml.sm} value='H' />}
                {!!type && <Tag style={_.ml.sm} value={type} />}
              </Flex>
            </Flex>
            {hasTip && (
              <Text style={_.mt.sm} size={11} numberOfLines={2}>
                {HTMLDecode(tip)}
              </Text>
            )}
            <Flex style={_.mt.sm} align='start'>
              {hasScore && (
                <Stars style={_.mr.xs} value={score} color='warning' />
              )}
              <Text style={_.mr.sm} type='sub' size={12} numberOfLines={1}>
                {hasScore && !!info.length && '/ '}
                {info.join(' / ')}
              </Text>
            </Flex>
          </Flex>
          {hasComment && (
            <Text style={[styles.comments, _.mt.md]} size={13}>
              {comments}
            </Text>
          )}
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

ItemCollections.defaultProps = {
  tags: '',
  event: EVENT
}

export default observer(ItemCollections)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind
  },
  containerActive: {
    backgroundColor: _.colorMainLight
  },
  imgContainer: {
    width: IMG_WIDTH
  },
  wrap: {
    paddingVertical: _.space,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  content: {
    height: IMG_HEIGHT
  },
  comments: {
    padding: _.sm,
    marginBottom: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  katakanas: {
    marginTop: -6
  }
}))
