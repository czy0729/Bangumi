/*
 * @Author: czy0729
 * @Date: 2024-05-14 05:00:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 05:09:28
 */
import React from 'react'
import { Flex, Image, Text, Touchable } from '@components'
import { InView } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Item({ item, index }) {
  const navigation = useNavigation()
  const isCatalog = item.title.includes('【目录】')
  const width = isCatalog ? Math.floor(_.window.contentWidth * 0.8) : _.window.contentWidth
  const height = isCatalog ? width : Math.floor(width * 1.41)
  const descSize = item.desc ? 10 : 0
  const titleSize = 15
  return (
    <Touchable
      style={styles.item}
      withoutFeedback
      onPress={() => {
        navigation.push('Topic', {
          topicId: item.topicId,
          _title: item.title,
          _group: 'Bangumi半月刊',
          _groupThumb: 'https://lain.bgm.tv/pic/icon/l/000/00/49/4986.jpg?r=1706848267'
        })

        t('半月刊.跳转', {
          topicId: item.topicId
        })
      }}
    >
      <Flex justify='center'>
        <InView y={(height + styles.item.marginBottom + descSize + titleSize) * index + 1}>
          <Image
            style={styles.cover}
            width={width}
            height={height}
            src={item.cover}
            radius={isCatalog ? _.radiusMd : 0}
          />
        </InView>
      </Flex>
      {!!item.desc && (
        <Text style={styles.desc} type='sub' size={descSize} align='right'>
          {item.desc}
        </Text>
      )}
      <Text style={_.mt.md} size={titleSize} bold align='center'>
        {item.title}
      </Text>
    </Touchable>
  )
}

export default ob(Item, COMPONENT)
