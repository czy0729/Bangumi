/*
 * @Author: czy0729
 * @Date: 2024-03-03 06:24:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 12:07:42
 */
import React from 'react'
import { Flex, Image, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'
import { IMG_HEIGHT_SM, IMG_WIDTH_SM } from '@constants'
import { Navigation } from '@types'
import { getOnPress } from '../item/utils'
import Progress from '../progress'
import Rank from '../rank'
import Refine from '../refine'
import { tinygrailLastDate } from '../utils'
import { memoStyles } from './styles'

function ItemRefine({
  assets,
  cover,
  index,
  lastActive,
  monoId,
  name,
  refine,
  sacrifices,
  userId,
  userName
}) {
  const { $, navigation } = useStore<{
    $: any
    navigation: Navigation
  }>()
  const styles = memoStyles()
  const go = $.state.go
  const onPress = () => {
    getOnPress(monoId, go, navigation)()
  }
  return (
    <Flex style={styles.container} align='start'>
      <Touchable onPress={onPress}>
        <Image
          src={tinygrailOSS(cover)}
          width={IMG_WIDTH_SM}
          height={IMG_HEIGHT_SM}
          radius
          skeletonType='tinygrail'
        />
      </Touchable>
      <Flex.Item style={_.ml.sm}>
        <Flex>
          <Rank value={index + 1} />
          <Touchable onPress={onPress}>
            <Text
              type='tinygrailPlain'
              size={name.length > 12 ? 10 : name.length > 8 ? 12 : 14}
              lineHeight={14}
              bold
            >
              {name}
            </Text>
          </Touchable>
          <Refine style={_.ml.xs} value={refine} />
        </Flex>
        <Flex style={_.mt.xs}>
          <Touchable
            onPress={() => {
              navigation.push('Zone', {
                userId
              })
            }}
          >
            <Text type='tinygrailText' size={12} lineHeight={13}>
              @{userName}
            </Text>
          </Touchable>
          <Text type='tinygrailText' size={12} lineHeight={13}>
            {' '}
            · {tinygrailLastDate(lastActive)}
          </Text>
        </Flex>
        <Progress style={styles.progress} assets={assets} sacrifices={sacrifices} />
      </Flex.Item>
    </Flex>
  )
}

export default ob(ItemRefine)
