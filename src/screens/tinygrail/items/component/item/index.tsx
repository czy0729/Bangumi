/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:13:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 04:38:09
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Flex, Iconfont, Image, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { TinygrailItemsItem } from '@stores/tinygrail/types'
import { formatNumber, tinygrailOSS } from '@utils'
import { r } from '@utils/dev'
import { ITEMS_USED } from '@tinygrail/_/characters-modal'
import { ITEMS_DESC } from '@tinygrail/_/ds'
import { IMAGE_WIDTH } from '../../ds'
import { Ctx, ItemsKeys } from '../../types'
import Used from '../used'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ item }: { item: TinygrailItemsItem }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()

    const canUsed = ITEMS_USED[item.name]
    const elContent = (
      <Flex style={styles.wrap} align='start'>
        <Image
          style={styles.image}
          size={IMAGE_WIDTH}
          src={tinygrailOSS(item.icon)}
          radius={_.radiusXs}
          skeletonType='tinygrail'
        />
        <Flex.Item style={_.ml.md}>
          <Text type='tinygrailPlain' size={15} bold>
            {item.name}
          </Text>
          <Text style={_.mt.xs} type='tinygrailText' size={10}>
            {ITEMS_DESC[item.name] || item.line}
          </Text>
        </Flex.Item>
        <Flex style={_.ml.sm}>
          <Text type='warning'>x{formatNumber(item.amount, 0)}</Text>
          {canUsed && (
            <Iconfont style={_.mr._sm} name='md-navigate-next' color={_.colorTinygrailText} />
          )}
        </Flex>
      </Flex>
    )

    if (canUsed) {
      return (
        <>
          <Touchable
            style={styles.item}
            onPress={() => {
              $.onShowModal(item.name)
            }}
          >
            {elContent}
          </Touchable>
          <Used name={item.name as ItemsKeys} />
        </>
      )
    }

    return <View style={styles.item}>{elContent}</View>
  })
}

export default Item
