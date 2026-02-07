/*
 * @Author: czy0729
 * @Date: 2019-09-12 19:58:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 21:41:09
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber, getTimestamp, info, lastDate } from '@utils'
import { t } from '@utils/fetch'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

const LIMIT = 10

function Records() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    const { expand } = $.state
    const { bidHistory, askHistory } = $.userLogs
    const needShowExpand = bidHistory.length > LIMIT || askHistory.length > LIMIT

    const sliceList = list => list.filter((_item, index) => expand || index < LIMIT)

    const getText = (
      item,
      {
        typeMap,
        sign
      }: {
        typeMap: Record<number, string>
        sign: '+' | '-'
      }
    ) => {
      const total = item.price * item.amount

      if (typeMap[item.type]) return typeMap[item.type]
      if (item.price) return `${sign}${formatNumber(total, 2, $.short)}`
      return lastDate(getTimestamp(String(item.time).replace('T', ' ')))
    }

    const renderList = (
      list,
      {
        title,
        titleType,
        typeMap,
        sign
      }: {
        title: string
        titleType: any
        typeMap: Record<number, string>
        sign: '+' | '-'
      }
    ) => (
      <Flex.Item>
        <Text style={_.mb.sm} type={titleType} size={16}>
          {title}
        </Text>

        {list.length === 0 && <Text type='tinygrailText'>-</Text>}

        {sliceList(list).map((item, index) => {
          const total = item.price * item.amount
          const text = getText(item, { typeMap, sign })

          return (
            <Touchable
              key={index}
              style={styles.item}
              onPress={() => {
                let text = String(item.time).replace('T', ' ')
                if (total) text += ` (${sign}${formatNumber(total, 2, $.short)})`
                info(text)

                t('交易.显示时间', {
                  monoId: $.monoId
                })
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
                <Text type='tinygrailText' size={12}>
                  {text}
                </Text>
              </Flex>
            </Touchable>
          )
        })}
      </Flex.Item>
    )

    return (
      <View style={styles.container}>
        <Flex align='start'>
          {renderList(bidHistory, {
            title: '买入记录',
            titleType: 'bid',
            sign: '-',
            typeMap: {
              5: '刮刮乐',
              4: '竞拍',
              3: '道标'
            }
          })}

          <View style={_.ml.md} />

          {renderList(askHistory, {
            title: '卖出记录',
            titleType: 'ask',
            sign: '+',
            typeMap: {
              5: '刮刮乐',
              3: '道标',
              2: '献祭'
            }
          })}
        </Flex>

        {needShowExpand && (
          <Touchable style={styles.expand} onPress={$.toggleExpand}>
            <Text type='warning' align='center'>
              {expand ? '收起' : '展开'}
            </Text>
          </Touchable>
        )}
      </View>
    )
  })
}

export default Records
