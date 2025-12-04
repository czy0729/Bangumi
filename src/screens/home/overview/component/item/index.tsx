/*
 * @Author: czy0729
 * @Date: 2024-05-14 05:00:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-02 23:48:13
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Flex, getCoverSrc, Text, Touchable } from '@components'
import { InView } from '@_'
import { getTypeCn } from '@_/base/horizontal-list/item/utils'
import { _ } from '@stores'
import { getCoverLarge } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Item({ item, index }: Props) {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => {
    const isMusic = getTypeCn(item.name, item.desc) === '音乐'
    const width = _.window.contentWidth
    const height = isMusic ? width : Math.floor(width * 1.41)

    const image = getCoverLarge(item.image)
    const descSize = item.desc ? 14 : 0
    const titleSize = 17

    return (
      <Touchable
        style={styles.item}
        withoutFeedback
        onPress={() => {
          navigation.push('Subject', {
            subjectId: item.id,
            _cn: item.name,
            _image: getCoverSrc(image, width)
          })

          t('照片墙.跳转', {
            subjectId: item.id
          })
        }}
      >
        <Flex justify='center'>
          <InView y={(height + styles.item.marginVertical * 2 + descSize + titleSize) * index + 1}>
            <Cover src={image} width={width} height={height} />
          </InView>
        </Flex>
        <View style={styles.content}>
          <Text size={titleSize} lineHeight={titleSize + 2} bold align='center'>
            {item.name}
          </Text>
          {!!item.desc && (
            <Text style={_.mt.sm} type='sub' size={descSize} align='center'>
              {item.desc}
            </Text>
          )}
        </View>
      </Touchable>
    )
  })
}

export default Item
