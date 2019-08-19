/*
 * @Author: czy0729
 * @Date: 2019-05-25 23:00:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-19 22:27:26
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Image, Touchable } from '@components'
import { getTimestamp } from '@utils'
import { getCoverMedium } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { IMG_DEFAULT } from '@constants'
import _ from '@styles'
import Stars from '../base/stars'

const imgWidth = 80
const imgHeight = 1.28 * imgWidth

const ItemCollections = ({
  navigation,
  index,
  id,
  cover,
  name,
  nameCn,
  tip,
  score,
  time,
  tags = '',
  comments,
  isOnHold
}) => {
  const _cover = getCoverMedium(cover)
  const isFirst = index === 0
  const hasName = !!name
  const hasTip = !!tip
  const hasScore = !!score
  const hasTags = !!tags
  const hasComment = !!comments
  let holdDays
  if (isOnHold) {
    holdDays = Math.ceil((getTimestamp() - getTimestamp(time)) / 86400)
  }
  return (
    <Touchable
      style={styles.container}
      highlight
      onPress={() =>
        navigation.push('Subject', {
          subjectId: id,
          _jp: name,
          _cn: nameCn,
          _image: _cover
        })
      }
    >
      <Flex align='start' style={[styles.wrap, !isFirst && styles.border]}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            src={_cover || IMG_DEFAULT}
            width={imgWidth}
            height={imgHeight}
            radius
            shadow
          />
        </View>
        <Flex.Item style={[styles.item, _.ml.wind]}>
          <Flex
            style={styles.content}
            direction='column'
            justify='between'
            align='start'
          >
            <Text numberOfLines={2}>
              {HTMLDecode(nameCn)}
              {hasName && name !== nameCn && (
                <Text type='sub' size={12} lineHeight={14}>
                  {' '}
                  {HTMLDecode(name)}
                </Text>
              )}
            </Text>
            {hasTip && (
              <Text style={_.mt.sm} size={12} numberOfLines={2}>
                {HTMLDecode(tip)}
              </Text>
            )}
            <Flex style={_.mt.sm} align='start'>
              {hasScore && (
                <Stars style={_.mr.xs} value={score} color='warning' />
              )}
              <Text style={_.mr.sm} type='sub' size={12} numberOfLines={2}>
                {hasScore && '/ '}
                {isOnHold && `搁置${holdDays}天 / `}
                {time} {hasTags && '/'} {tags.replace(' ', '')}
              </Text>
            </Flex>
          </Flex>
          {hasComment && (
            <Text style={[styles.comments, _.mt.md]}>{comments}</Text>
          )}
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default observer(ItemCollections)

const styles = StyleSheet.create({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  imgContainer: {
    width: imgWidth
  },
  wrap: {
    paddingVertical: _.wind,
    paddingRight: _.wind
  },
  item: {
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  content: {
    height: imgHeight
  },
  comments: {
    padding: _.sm,
    backgroundColor: _.colorBg,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
})
