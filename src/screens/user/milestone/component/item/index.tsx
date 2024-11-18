/*
 * @Author: czy0729
 * @Date: 2024-10-11 05:10:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:49:46
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, getCoverSrc, Image, ImageProps, Text, Touchable } from '@components'
import { Stars } from '@_'
import { _, useStore } from '@stores'
import { getTimestamp, HTMLDecode, lastDate, stl } from '@utils'
import { ob } from '@utils/decorators'
import { IMG_SUBJECT_ONLY, MODEL_SUBJECT_TYPE } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Item({ item, index }: Props) {
  const { $, navigation } = useStore<Ctx>()
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
  }

  const numColumns = Number($.state.numColumns)
  let size = 12
  if (numColumns === 4) {
    size -= 1
  } else if (numColumns === 5) {
    size -= 2
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
          {!!titleText && (
            <Text
              style={styles.title}
              size={size}
              bold
              numberOfLines={numberOfLines}
              align='center'
            >
              {HTMLDecode(titleText)}
            </Text>
          )}
          {!!subTitleText && (
            <Text style={styles.sub} type='sub' size={size} bold align='center'>
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
            <Text style={styles.sub} type='sub' size={size} bold align='center'>
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

export default ob(Item, COMPONENT)
