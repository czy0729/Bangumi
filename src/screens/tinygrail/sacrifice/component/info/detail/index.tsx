/*
 * @Author: czy0729
 * @Date: 2024-03-07 06:26:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-03 23:33:19
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { useObserver } from '@utils/hooks'
import TinygrailProgress from '@tinygrail/_/progress'
import TinygrailStatus from '@tinygrail/_/status'

import type { TextType } from '@components'
import type { Ctx } from '../../../types'

function Detail() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    let color: TextType = 'tinygrailPlain'
    if ($.fluctuation < 0) {
      color = 'ask'
    } else if ($.fluctuation > 0) {
      color = 'bid'
    }

    let fluctuationText = '-%'
    if ($.fluctuation > 0) {
      fluctuationText = `+${toFixed($.fluctuation, 2)}%`
    } else if ($.fluctuation < 0) {
      fluctuationText = `${toFixed($.fluctuation, 2)}%`
    }

    const amountText = $.userLogs.amount
      ? `持有 ${formatNumber(Number($.userLogs.amount), 0)} 股`
      : '无持股'

    const assets = $.myTemple.assets || $.userLogs.sacrifices || 0
    const sacrifices = $.myTemple.sacrifices || $.userLogs.sacrifices || 0

    return (
      <View style={[_.container.wind, _.mt.xs]}>
        <Flex justify='center' align='baseline'>
          <Text type='tinygrailPlain' bold>
            ₵{$.current && toFixed($.current, 1)}
          </Text>
          <Text type={color} size={11} lineHeight={12} align='center'>
            {' '}
            {fluctuationText}
          </Text>
          <Text type='tinygrailText' size={11} lineHeight={12} align='center'>
            {' '}
            / 发行价 {toFixed($.issuePrice, 1)} / 市值 {formatNumber($.marketValue, 0, $.short)} /
            流通量 {formatNumber($.total, 0, $.short)}
          </Text>
        </Flex>
        <Flex style={_.mt.xs} justify='center'>
          <Text
            type={amountText === '无持股' ? 'tinygrailText' : 'warning'}
            size={11}
            lineHeight={12}
            align='center'
          >
            {amountText}
          </Text>
          {!!sacrifices && (
            <>
              <View
                style={{
                  width: 112,
                  marginLeft: _.sm,
                  opacity: 0.76
                }}
              >
                <TinygrailProgress
                  size='sm'
                  assets={assets}
                  sacrifices={sacrifices}
                  refine={$.myTemple.refine}
                />
              </View>
              {!!$.myTemple.refine && (
                <Text style={_.ml.xs} type='tinygrailText' size={11} lineHeight={12} align='center'>
                  +{$.myTemple.refine}
                </Text>
              )}
            </>
          )}
          <TinygrailStatus
            style={{
              marginLeft: _.xs,
              marginTop: 1
            }}
            id={$.monoId}
          />
        </Flex>
      </View>
    )
  })
}

export default Detail
