/*
 * @Author: czy0729
 * @Date: 2024-03-07 18:24:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:24:49
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Flex, Input, Text } from '@components'
import { _, useStore } from '@stores'
import { confirm, formatNumber } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Amount() {
  const { $ } = useStore<Ctx>()
  useMount(() => {
    $.fetchQueueUnique([$.fetchMyTemple, $.fetchStarForcesRankValues])
  })

  return useObserver(() => {
    const styles = memoStyles()
    const { loading, starForcesValue } = $.state
    return (
      <Flex style={_.mt.sm}>
        <Flex.Item>
          <View style={styles.inputWrap}>
            <Input
              style={styles.input}
              keyboardType='numeric'
              value={String(Math.floor(starForcesValue))}
              clearButtonMode='never'
              onChangeText={$.changeStarForces}
            />
            {!!$.myTemple.userStarForces && (
              <Text style={styles.starforce} type='ask' size={12} pointerEvents='none'>
                已贡献 {formatNumber($.myTemple.userStarForces, 0)} 星之力
              </Text>
            )}
          </View>
        </Flex.Item>
        <View style={styles.btnSubmit}>
          <Button
            style={styles.btnAsk}
            type='ask'
            radius={false}
            loading={loading}
            onPress={() => {
              if (loading) return

              confirm(
                `消耗固定资产 ${formatNumber(starForcesValue, 0)} 灌注星之力, 确定?`,
                () => $.doStarForces(),
                '小圣杯助手'
              )
            }}
          >
            确定
          </Button>
        </View>
      </Flex>
    )
  })
}

export default Amount
