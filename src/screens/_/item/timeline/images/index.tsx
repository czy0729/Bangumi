/*
 * @Author: czy0729
 * @Date: 2022-11-11 19:53:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-03 01:12:50
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Touchable, Flex } from '@components'
import { _ } from '@stores'
import { findSubjectCn } from '@utils'
import { ob } from '@utils/decorators'
import { IMG_HEIGHT_SM, IMG_WIDTH_SM, SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Cover } from '../../../base'
import { matchSubjectId } from '../utils'
import { AVATAR_COVER_WIDTH } from '../ds'
import { styles } from './styles'

function Images({ type, image, p3Text, p3Url, onNavigate }) {
  if (image.length <= 1) return null

  const images = image.map((item: string, index: number) => {
    const isAvatar = !String(!!p3Url.length && p3Url[0]).includes('subject')
    return (
      <View key={item || index} style={type ? _.mr.md : _.mr.sm}>
        <Touchable
          animate
          onPress={() => {
            const url = (!!p3Url.length && p3Url[index]) || ''
            const subjectId = matchSubjectId(url)
            onNavigate(url, {
              _cn: findSubjectCn(!!p3Text.length && p3Text[index], subjectId),
              _jp: !!p3Text.length && p3Text[index],
              _name: !!p3Text.length && p3Text[index],
              _image: item,
              _type: type
            })
          }}
        >
          <Cover
            src={item}
            size={isAvatar ? AVATAR_COVER_WIDTH : IMG_WIDTH_SM}
            height={isAvatar ? AVATAR_COVER_WIDTH : IMG_HEIGHT_SM}
            radius
            shadow
            type={type}
          />
        </Touchable>
      </View>
    )
  })

  if (image.length <= 3) return <Flex style={_.mt.sm}>{images}</Flex>

  // 有一次性操作很多条目很多图片的情况, 水平滚动比较合适
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.images}
      horizontal
      {...SCROLL_VIEW_RESET_PROPS}
    >
      {images}
    </ScrollView>
  )
}

export default ob(Images)
