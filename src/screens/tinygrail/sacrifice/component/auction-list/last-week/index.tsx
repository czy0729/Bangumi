/*
 * @Author: czy0729
 * @Date: 2024-03-08 02:06:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:14:11
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { AUCTIONS_SORT_DS } from '../../../ds'
import { Ctx } from '../../../types'
import { styles } from './styles'

function LastWeek({ total, count, amount, avg, median, current }) {
  const { $ } = useStore<Ctx>()
  const { auctionsSort } = $.state
  const textProps = {
    type: 'tinygrailPlain',
    size: current ? 11 : 12,
    lineHeight: 15
  } as const
  return (
    <View style={styles.lastWeek}>
      {total ? (
        <Flex style={_.mt._sm} align='start'>
          <Flex.Item style={_.mr.sm}>
            <Text {...textProps}>
              上周公示：共 {total || '-'} 人拍卖，成功 {count || '-'} 人 /{' '}
              {amount ? formatNumber(amount, 0) : '-'} 股，均价{' '}
              <Text {...textProps} underline>
                ₵{toFixed(avg, 2)}
              </Text>
              ，中位价{' '}
              <Text {...textProps} underline>
                ₵{toFixed(median, 2)}
              </Text>
              {current ? `，本周均价 ` : ''}
              {current ? (
                <Text {...textProps} underline>
                  ₵{toFixed(current, 2)}
                </Text>
              ) : (
                ''
              )}
            </Text>
          </Flex.Item>
          <Popover data={AUCTIONS_SORT_DS} onSelect={$.selectAuctionsSort}>
            <Flex style={styles.touch}>
              <Iconfont name='md-sort' size={19} color={_.colorTinygrailText} />
              {auctionsSort !== '默认' && (
                <Text style={_.ml.xs} type='tinygrailText' size={11} bold>
                  {auctionsSort}
                </Text>
              )}
            </Flex>
          </Popover>
        </Flex>
      ) : (
        <Flex direction='column'>
          <Text style={_.mb.sm} type='tinygrailPlain' size={12}>
            上周没有拍卖纪录
          </Text>
        </Flex>
      )}
    </View>
  )
}

export default ob(LastWeek)
