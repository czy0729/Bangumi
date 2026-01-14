/*
 * @Author: czy0729
 * @Date: 2024-03-07 16:28:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:14:22
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, tinygrailStore, useStore } from '@stores'
import { confirm, formatNumber, lastDate } from '@utils'
import { useObserver } from '@utils/hooks'

import type { Ctx } from '../../../types'

function Check() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { lastSacrifice } = $.state

    return (
      <Flex style={_.mt.sm}>
        <Touchable
          onPress={() => {
            if (tinygrailStore.checkAuth()) {
              if ($.state.loading) return

              confirm(
                `当前角色测试献祭效率至少需要先献祭 (${$.testAmount}) 股, 确定?`,
                () => $.doTestSacrifice(),
                '小圣杯助手'
              )
            }
          }}
        >
          <Text type='tinygrailText' size={12}>
            [效率]
          </Text>
        </Touchable>
        {!!lastSacrifice.time && (
          <Text style={_.ml.xs} type='tinygrailText' size={12}>
            最近 (单价{formatNumber(Number(lastSacrifice.total) / Number(lastSacrifice.amount), 1)}{' '}
            / 效率
            {formatNumber(
              (Number(lastSacrifice.total) / Number(lastSacrifice.amount) / $.current) * 100,
              0
            )}
            % / {lastDate(lastSacrifice.time)})
          </Text>
        )}
      </Flex>
    )
  })
}

export default Check
