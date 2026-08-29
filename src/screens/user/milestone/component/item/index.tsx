/*
 * @Author: czy0729
 * @Date: 2024-10-11 05:10:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 21:05:14
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, getCoverSrc, Image, Text, Touchable } from '@components'
import { Stars } from '@_'
import { _, useStore } from '@stores'
import { getVisualLength, stl } from '@utils'
import { IMG_SUBJECT_ONLY, MODEL_SUBJECT_TYPE } from '@constants'
import { getExtraText } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { ImageProps } from '@components'
import type { Ctx, SubTitle } from '../../types'
import type { Props } from './types'

function Item({ item, index }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  // 使用预计算的数据 (titleDecoded 已跟随 cnFirst 设置)
  const { titleDecoded, titleVisualLength } = item

  const numberOfLines = Number($.state.numberOfLines) || 0

  const subTitleText = getExtraText($.state.subTitle, index ?? 0, item, $.state.lastTime)
  const extraTitleText = getExtraText($.state.extraTitle, index ?? 0, item, $.state.lastTime)

  const numColumns = Number($.state.numColumns)
  let size = 12
  if (numColumns === 4) {
    size -= 1
  } else if (numColumns === 5) {
    size -= 2
  }

  // 行数 = 无 时不显示标题
  const title = numberOfLines ? titleDecoded : ''
  let titleSize = size
  if ($.state.titleAutoSize) {
    if (titleVisualLength >= 20) {
      titleSize -= 2
    } else if (titleVisualLength >= 12) {
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

  /** 渲染第二行 / 第三行的文本与评分星星 */
  const renderSub = (mode: SubTitle, text: string) => (
    <>
      {!!text && (
        <Text
          style={styles.sub}
          type='sub'
          size={size - (getVisualLength(text) >= 16 ? 2 : 0)}
          numberOfLines={4}
          bold
          align='center'
        >
          {text}
        </Text>
      )}
      {!!(mode === '评分' && item.score) && (
        <Stars
          style={stl(styles.stars, $.state.starsFull && styles.starsFull)}
          value={item.score}
          simple={!$.state.starsFull}
          color={$.state.starsColor ? undefined : _.colorSub}
          hideScore={false}
        />
      )}
    </>
  )

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
          {renderSub($.state.subTitle, subTitleText)}
          {renderSub($.state.extraTitle, extraTitleText)}
        </Flex>
      </Touchable>
    </Flex>
  )
}

export default observer(Item)
