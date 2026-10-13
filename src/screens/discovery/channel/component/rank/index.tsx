/*
 * @Author: czy0729
 * @Date: 2020-05-04 18:42:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 注目榜: 第 1 名等宽 / 第 2-3 名半宽 / 第 4-15 名一行三个
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { IconNavigate, InView, SectionTitle } from '@_'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import ItemLg from './item-lg'
import ItemSm from './item-sm'
import ItemXs from './item-xs'
import { COMPONENT, RANK_SIZE } from './ds'
import { GAP } from '../ds'
import { getCoverHeight } from '../utils'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Rank() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { rank = [] } = $.channel
  const top = rank.slice(0, 1)
  const row = rank.slice(1, 3)
  const rest = rank.slice(3, RANK_SIZE)

  // 按实际卡片高度推算各行的懒渲染坐标
  const isMusic = $.typeCn === '音乐'
  const height1 = getCoverHeight(isMusic, _.grid(1))
  const height2 = getCoverHeight(isMusic, _.grid(2))
  const height3 = getCoverHeight(isMusic, _.grid(3))
  const baseSm = height1 + GAP
  const baseXs = baseSm + height2 + GAP

  return (
    <View style={_.mt.lg}>
      <SectionTitle
        style={_.container.wind}
        left={
          <Text style={_.ml.sm} type='sub' size={12} lineHeight={20}>
            根据最近 30 日标记
          </Text>
        }
        right={
          <IconNavigate
            onPress={() => {
              navigation.push('Rank', {
                type: $.type
              })

              t('频道.跳转', {
                to: 'Rank',
                from: '关注榜',
                type: $.type
              })
            }}
          />
        }
      >
        注目榜
      </SectionTitle>

      <View style={styles.grid}>
        {top.map((item, index) => (
          <ItemLg key={item.id} item={item} index={index} y={0} />
        ))}

        {!!row.length && (
          <Flex wrap='wrap'>
            {row.map((item, index) => (
              <ItemSm
                key={item.id}
                item={item}
                index={index}
                y={InView.y(index, height2, baseSm, 2)}
              />
            ))}
          </Flex>
        )}

        {!!rest.length && (
          <Flex wrap='wrap'>
            {rest.map((item, index) => (
              <ItemXs
                key={item.id}
                item={item}
                index={index}
                y={InView.y(index, height3, baseXs, 3)}
              />
            ))}
          </Flex>
        )}
      </View>
    </View>
  )
}

export default observer(Rank)
