/*
 * @Author: czy0729
 * @Date: 2024-03-11 06:08:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:24:43
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, tinygrailStore, useStore } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import ItemTemple from '@tinygrail/_/item-temple'
import Rank from '@tinygrail/_/rank'
import { calculateRate, calculateTempleRate, decimal } from '@tinygrail/_/utils'
import { Ctx } from '../../../types'

function Temple() {
  const { $ } = useStore<Ctx>()
  useMount(() => {
    $.fetchQueueUnique([$.fetchTest, $.fetchMyTemple])
  })

  return useObserver(() => {
    if (!$.myTemple.assets) {
      return (
        <Text type='tinygrailText' size={11} align='center'>
          需要先制造圣殿才能精炼
        </Text>
      )
    }

    const { cover, level: templeLevel, refine, assets, sacrifices } = $.myTemple
    const templeRate = calculateTempleRate($.rate, $.rank, $.stars, $.level, refine)
    const templeRateNext = calculateTempleRate($.rate, $.rank, $.stars, $.level, refine + 1)
    const totalTempleRate = templeRate * assets
    const totalTempleRateNext = templeRateNext * assets
    const templeRateFail = calculateTempleRate($.rate, $.rank, $.stars, $.level, 0)
    const totalTempleRateFail = templeRateFail * assets
    return (
      <Flex>
        {!!cover && (
          <Flex justify='center'>
            <ItemTemple
              style={{
                marginLeft: 0,
                marginBottom: 0
              }}
              cover={cover}
              level={templeLevel}
              refine={refine}
            />
          </Flex>
        )}
        <Flex.Item style={_.ml.md}>
          <Flex style={_.mt._md}>
            <Rank value={$.rank} />
            <Text style={_.ml.xs} type='tinygrailPlain' size={13}>
              精炼后:
            </Text>
          </Flex>
          <Text style={_.mt.sm} type='tinygrailText' size={11}>
            活股股息: {toFixed(calculateRate($.rate, $.rank, $.stars), 1)}
          </Text>
          <Text style={_.mt.xs} type='tinygrailText' size={11}>
            圣殿股息: {toFixed(templeRate, 1)} →{' '}
            <Text type='bid' size={11}>
              {toFixed(templeRateNext, 1)}
            </Text>{' '}
            /{' '}
            <Text type='ask' size={11}>
              {toFixed(templeRateFail, 1)}
            </Text>
          </Text>
          <Text style={_.mt.xs} type='tinygrailText' size={11}>
            圣殿资产: {formatNumber(assets, 0)} / {formatNumber(sacrifices, 0)}
          </Text>
          <Text style={_.mt.xs} type='tinygrailText' size={11}>
            圣殿总息: {decimal(totalTempleRate)} →{' '}
            <Text type='bid' size={11}>
              {decimal(totalTempleRateNext)}
            </Text>{' '}
            /{' '}
            <Text type='ask' size={11}>
              {decimal(totalTempleRateFail)}
            </Text>
          </Text>
          <Text style={_.mt.xs} type='tinygrailText' size={11}>
            税后变化: 预计{' '}
            <Text type='bid' size={11}>
              +{decimal(tinygrailStore.testRatio * (totalTempleRateNext - totalTempleRate))}
            </Text>{' '}
            /{' '}
            <Text type='ask' size={11}>
              {decimal(tinygrailStore.testRatio * (totalTempleRateFail - totalTempleRate))}
            </Text>
          </Text>
        </Flex.Item>
      </Flex>
    )
  })
}

export default Temple
