/*
 * @Author: czy0729
 * @Date: 2019-11-17 01:37:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-29 06:01:09
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { formatChange, formatValue } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Assets() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { currentBalance, currentTotal, lastBalance, lastTotal } = $.state
    const { balance, lastIndex } = $.assets

    // 数值
    const balanceText = formatValue(balance, $.short)
    const totalText = formatValue($.total, $.short)

    // 变化
    const { text: balanceChange, color: balanceChangeColor } = formatChange(
      currentBalance,
      lastBalance,
      $.short
    )
    const { text: totalChange, color: totalChangeColor } = formatChange(
      currentTotal,
      lastTotal,
      $.short
    )

    return (
      <Flex style={styles.assets}>
        <Flex.Item>
          <Touchable style={styles.touch} onPress={$.toogleShort}>
            <Text type='tinygrailPlain' size={13} bold>
              {balanceText}
              {balanceChange && (
                <Text type={balanceChangeColor} size={10} lineHeight={13} bold>
                  {' '}
                  {balanceChange}
                </Text>
              )}{' '}
              / {totalText}{' '}
              {totalChange && (
                <Text type={totalChangeColor} size={10} lineHeight={13} bold>
                  {totalChange}{' '}
                </Text>
              )}
              {!!lastIndex && `/ #${lastIndex}`}
              <Text type='tinygrailPlain' size={13} bold>
                {' '}
                {$.short ? '[-]' : '[+]'}
              </Text>
            </Text>
          </Touchable>
        </Flex.Item>
        <IconTouchable
          style={_.mr._sm}
          name='md-calculate'
          color={_.colorTinygrailPlain}
          onPress={$.doTest}
        />
      </Flex>
    )
  })
}

export default Assets
