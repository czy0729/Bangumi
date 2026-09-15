/*
 * @Author: czy0729
 * @Date: 2024-05-14 05:00:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 04:11:10
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Image, Squircle, Text, Touchable } from '@components'
import { InView } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { HOST_BGM_STATIC } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { RenderItem } from '@types'
import type { DataItem } from '../../types'

function Item({ item, index }: RenderItem<DataItem>) {
  const navigation = useNavigation(COMPONENT)

  // --- Data Logic ---
  const isCatalog = item.title.includes('【目录】')
  const width = isCatalog ? Math.floor(_.window.contentWidth * 0.8) : _.window.contentWidth
  const height = isCatalog ? width : Math.floor(width * 1.41)
  const descSize = item.desc ? 10 : 0
  const titleSize = 15

  // --- Handlers ---
  const handlePress = useCallback(() => {
    navigation.push('Topic', {
      topicId: item.topicId,
      _title: item.title,
      _group: 'Bangumi半月刊',
      _groupThumb: `${HOST_BGM_STATIC}/pic/icon/l/000/00/49/4986.jpg?r=1706848267`
    })

    t('半月刊.跳转', {
      topicId: item.topicId
    })
  }, [navigation, item])

  // --- Render ---
  return (
    <Touchable style={styles.item} withoutFeedback onPress={handlePress}>
      <Flex justify='center'>
        <InView y={InView.y(index - 1, height + styles.item.marginBottom + descSize + titleSize)}>
          <Squircle
            style={styles.cover}
            width={width}
            height={height}
            radius={isCatalog ? _.radiusMd : 0}
          >
            <Image width={width} height={height} src={item.cover} radius={0} />
          </Squircle>
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

export default observer(Item)
