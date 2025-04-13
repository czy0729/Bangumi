/*
 * @Author: czy0729
 * @Date: 2019-09-12 19:58:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 19:41:11
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber, getTimestamp, info, lastDate } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const LIMIT = 10

function Records() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { expand } = $.state
  const { bidHistory, askHistory } = $.userLogs
  const needShowExpand = bidHistory.length > LIMIT || askHistory.length > LIMIT
  return (
    <View style={styles.container}>
      <Flex align='start'>
        <Flex.Item>
          <Text style={_.mb.sm} type='bid' size={16}>
            买入记录
          </Text>
          {bidHistory.length === 0 && <Text type='tinygrailText'>-</Text>}
          {bidHistory
            .filter((_item, index) => (expand ? true : index < LIMIT))
            .map((item, index) => (
              <Touchable
                key={index}
                style={styles.item}
                onPress={() => {
                  t('交易.显示时间', {
                    monoId: $.monoId
                  })

                  info(`成交时间: ${String(item.time).replace('T', ' ')}`)
                }}
              >
                <Flex>
                  <Flex.Item>
                    <Text size={12} type='tinygrailPlain'>
                      {formatNumber(item.price)} /{' '}
                      <Text type='tinygrailText' size={12}>
                        {formatNumber(item.amount, 0)}
                      </Text>
                    </Text>
                  </Flex.Item>
                  <Text type={item.price ? 'tinygrailPlain' : 'tinygrailText'} size={12}>
                    {item.price
                      ? `-${formatNumber(item.price * item.amount, 2, $.short)}`
                      : lastDate(getTimestamp(String(item.time).replace('T', ' ')))}
                  </Text>
                </Flex>
              </Touchable>
            ))}
        </Flex.Item>
        <Flex.Item style={_.ml.md}>
          <Text style={_.mb.sm} type='ask' size={16}>
            卖出记录
          </Text>
          {askHistory.length === 0 && <Text type='tinygrailText'>-</Text>}
          {askHistory
            .filter((_item, index) => (expand ? true : index < LIMIT))
            .map((item, index) => (
              <Touchable
                key={index}
                style={styles.item}
                onPress={() => {
                  t('交易.显示时间', {
                    monoId: $.monoId
                  })

                  info(`成交时间: ${String(item.time).replace('T', ' ')}`)
                }}
              >
                <Flex>
                  <Flex.Item>
                    <Text type='tinygrailPlain' size={12}>
                      {formatNumber(item.price)} /{' '}
                      <Text type='tinygrailText' size={12}>
                        {formatNumber(item.amount, 0)}
                      </Text>
                    </Text>
                  </Flex.Item>
                  <Text type={item.price ? 'tinygrailPlain' : 'tinygrailText'} size={12}>
                    {item.price
                      ? `+${formatNumber(item.price * item.amount, 2, $.short)}`
                      : lastDate(getTimestamp(String(item.time).replace('T', ' ')))}
                  </Text>
                </Flex>
              </Touchable>
            ))}
        </Flex.Item>
      </Flex>
      {needShowExpand && (
        <Touchable style={[styles.expand, _.mt.sm]} onPress={$.toggleExpand}>
          <Text type='warning' align='center'>
            {expand ? '收起' : '展开'}
          </Text>
        </Touchable>
      )}
    </View>
  )
}

export default ob(Records, COMPONENT)
