/*
 * @Author: czy0729
 * @Date: 2025-07-08 18:18:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-08 18:35:11
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { confirm, lastDate } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { decimal } from '@tinygrail/_/utils'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Balance() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { _total = 0, _lastTotal = 0, _loaded } = $.state.balance
    const increase = _total >= _lastTotal
    return (
      <View style={styles.balance}>
        <Flex style={styles.body}>
          <Flex.Item>
            <Text type='tinygrailText' size={12} bold>
              前百总现金 ₵{decimal(_total)}{' '}
              <Text type={increase ? 'bid' : 'ask'} size={10} lineHeight={12} bold>
                {increase ? '+' : '-'}
                {decimal(Math.abs(_total - _lastTotal))}
              </Text>
            </Text>
          </Flex.Item>
          <Touchable
            style={styles.touch}
            onPress={() => {
              confirm('刷新?', $.fetchAllRichAssets, '小圣杯助手')
            }}
          >
            <Flex>
              <Text type='tinygrailText' size={12} bold>
                {lastDate(Number(_loaded))}
              </Text>
              <Iconfont style={_.ml.xs} name='md-refresh' size={18} color={_.colorTinygrailIcon} />
            </Flex>
          </Touchable>
        </Flex>
      </View>
    )
  })
}

export default Balance
