/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:13:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-28 08:03:33
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
    if (ITEMS_USED[item.name]) {
      return (
        <>
          <Touchable style={styles.item} onPress={() => $.onShowModal(item.name)}>
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
                <Iconfont style={_.mr._sm} name='md-navigate-next' color={_.colorTinygrailText} />
              </Flex>
            </Flex>
          </Touchable>
          <Used name={item.name as ItemsKeys} />
        </>
      )
    }

    return (
      <View style={styles.item}>
        <Flex style={styles.wrap} align='start'>
          <Image
            style={styles.image}
            size={IMAGE_WIDTH}
            src={tinygrailOSS(item.icon)}
            radius={_.radiusXs}
            skeletonType='tinygrail'
          />
          <Flex.Item style={_.ml.md}>
            <Text type='tinygrailPlain' bold>
              {item.name}
            </Text>
            <Text style={_.mt.xs} type='tinygrailText' size={10}>
              {ITEMS_DESC[item.name] || item.line}
            </Text>
          </Flex.Item>
          <Text style={_.ml.sm} type='warning'>
            x{formatNumber(item.amount, 0)}
          </Text>
        </Flex>
      </View>
    )
  })
}

export default Item
