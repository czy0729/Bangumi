/*
 * @Author: czy0729
 * @Date: 2024-10-11 05:10:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-24 21:11:19
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, getCoverSrc, Image, Text, Touchable } from '@components'
import { Stars } from '@_'
import { _, useStore } from '@stores'
import { getTimestamp, getVisualLength, HTMLDecode, lastDate, stl } from '@utils'
import { IMG_SUBJECT_ONLY, MODEL_SUBJECT_TYPE } from '@constants'
import { getLastParts, getPartAfterDate } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ImageProps } from '@components'
import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ item, index }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)
  const { subjectType } = $.state

  const styles = memoStyles()

  const numberOfLines = Number($.state.numberOfLines) || 0
  let titleText = ''
  if (numberOfLines) {
    titleText = $.state.cnFirst ? item.nameCn || item.name : item.name || item.nameCn
  }

  let subTitleText = ''
  if ($.state.subTitle === '序号') {
    subTitleText = `#${index + 1}`
  } else if ($.state.subTitle === '时间') {
    if ($.state.lastTime) {
      const ts = getTimestamp(item.time)
      subTitleText = lastDate(ts)
      if (subTitleText.includes('年')) subTitleText = lastDate(ts, false)
    } else {
      subTitleText = String(item.time).slice(2)
    }
  } else if ($.state.subTitle === '描述') {
    if (item.tip) {
      const lastPart =
        subjectType === 'game' ? getLastParts(item.tip, 2) : getPartAfterDate(item.tip)
      if (lastPart) subTitleText = lastPart
    }
  }

  let extraTitleText = ''
  if ($.state.extraTitle === '序号') {
    extraTitleText = `#${index + 1}`
  } else if ($.state.extraTitle === '时间') {
    if ($.state.lastTime) {
      const ts = getTimestamp(item.time)
      extraTitleText = lastDate(ts)
      if (extraTitleText.includes('年')) extraTitleText = lastDate(ts, false)
    } else {
      extraTitleText = String(item.time).slice(2)
    }
  } else if ($.state.extraTitle === '描述') {
    if (item.tip) {
      const lastPart =
        subjectType === 'game' ? getLastParts(item.tip, 2) : getPartAfterDate(item.tip)
      if (lastPart) extraTitleText = lastPart
    }
  }

  const numColumns = Number($.state.numColumns)
  let size = 12
  if (numColumns === 4) {
    size -= 1
  } else if (numColumns === 5) {
    size -= 2
  }

  const title = HTMLDecode(titleText)
  let titleSize = size
  if ($.state.titleAutoSize) {
    const visualLength = getVisualLength(title)
    if (visualLength >= 20) {
      titleSize -= 2
    } else if (visualLength >= 12) {
      titleSize -= 1
    }
  }

  const width = Math.floor(_.window.contentWidth / (numColumns + 0.2 * numColumns))
  const imageProps: Partial<ImageProps> = {}
  if ($.state.autoHeight) {
    imageProps.autoSize = width
  } else {
    imageProps.width = width
    imageProps.height = $.state.subjectType === 'music' ? width : Math.floor(width * 1.34)
  }

  return (
    <Flex
      style={{
        width: `${Math.floor(100 / numColumns)}%`
      }}
      justify='center'
      align='start'
    >
      <Touchable
        onPress={() => {
          navigation.push('Subject', {
            subjectId: item.id,
            _image: getCoverSrc(item.cover, width),
            _cn: item.nameCn,
            _jp: item.name,
            _type: MODEL_SUBJECT_TYPE.getTitle($.state.subjectType)
          })
        }}
      >
        <Flex
          style={[
            styles.item,
            {
              width
            }
          ]}
          direction='column'
        >
          <Flex
            style={{
              width
            }}
            justify='center'
          >
            <View style={styles.image}>
              <Image
                key={String($.state.autoHeight)}
                src={
                  item.cover === '/img/no_icon_subject.png'
                    ? IMG_SUBJECT_ONLY
                    : getCoverSrc(item.cover, width, false, true)
                }
                radius={$.state.radius ? _.radiusXs : 0}
                skeleton={false}
                placeholder={false}
                border={_.select('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.16)')}
                priority={index < 10 ? 'high' : index < 24 ? 'normal' : 'low'}
                {...imageProps}
              />
            </View>
          </Flex>
          {!!title && (
            <Text
              style={styles.title}
              size={titleSize}
              lineHeight={size}
              bold
              numberOfLines={numberOfLines}
              align='center'
            >
              {title}
            </Text>
          )}
          {!!subTitleText && (
            <Text
              style={styles.sub}
              type='sub'
              size={size - (getVisualLength(extraTitleText) >= 16 ? 2 : 0)}
              numberOfLines={4}
              bold
              align='center'
            >
              {subTitleText}
            </Text>
          )}
          {!!($.state.subTitle === '评分' && item.score) && (
            <Stars
              style={stl(styles.stars, $.state.starsFull && styles.starsFull)}
              value={item.score}
              simple={!$.state.starsFull}
              color={$.state.starsColor ? undefined : _.colorSub}
            />
          )}
          {!!extraTitleText && (
            <Text
              style={styles.sub}
              type='sub'
              size={size - (getVisualLength(extraTitleText) >= 16 ? 2 : 0)}
              numberOfLines={4}
              bold
              align='center'
            >
              {extraTitleText}
            </Text>
          )}
          {!!($.state.extraTitle === '评分' && item.score) && (
            <Stars
              style={stl(styles.stars, $.state.starsFull && styles.starsFull)}
              value={item.score}
              simple={!$.state.starsFull}
              color={$.state.starsColor ? undefined : _.colorSub}
            />
          )}
        </Flex>
      </Touchable>
    </Flex>
  )
}

export default observer(Item)
