/*
 * @Author: czy0729
 * @Date: 2025-07-02 16:56:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-05 04:08:32
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Avatar, Flex, ScrollView, Text, Touchable } from '@components'
import { _, tinygrailStore } from '@stores'
import { feedback, formatNumber, tinygrailOSS } from '@utils'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'
import { Item } from './types'

function Chart({ onPress }) {
  return useObserver(() => {
    const { list, _loaded } = tinygrailStore.starLogs
    const data = useMemo(() => {
      if (!_loaded) return []

      // 1. 聚合数据（按 type + monoId 分组）
      const aggregated = list
        .filter(item => item.type === 0 || item.type === 1)
        .reduce<Item>((acc, item) => {
          const id = `${item.type}|${item.monoId}`
          if (!acc[id]) {
            acc[id] = {
              type: item.type,
              monoId: item.monoId,
              name: item.name,
              icon: item.icon,
              amount: item.type === 1 ? -item.amount : item.amount // 减分存为负数
            }
          } else {
            acc[id].amount += item.type === 1 ? -item.amount : item.amount
          }
          return acc
        }, {})

      // 2. 分离加/减分数据
      const positive = Object.values(aggregated).filter(item => item.type === 0)
      const negative = Object.values(aggregated).filter(item => item.type === 1)

      // 3. 排序
      positive.sort((a, b) => b.amount - a.amount) // 加分从大到小
      negative.sort((a, b) => a.amount - b.amount) // 减分从小到大（因存储为负数）

      // 4. 限制条目数并合并
      return [...positive.slice(0, 10), ...negative.slice(0, 10).reverse()]
    }, [_loaded, list])

    // 计算最大值（用于后续比例展示）
    const max =
      Math.max(...data.filter(item => item.type === 0).map(item => Math.abs(item.amount))) || 1
    const min =
      Math.max(...data.filter(item => item.type === 1).map(item => Math.abs(item.amount))) || 1
    return (
      <View style={styles.chart}>
        <ScrollView contentContainerStyle={styles.scroll} horizontal>
          <Flex>
            {data.map(item => (
              <Touchable
                key={item.monoId}
                onPress={() => {
                  const index = list.findIndex(
                    i => `${item.type}|${item.monoId}` === `${i.type}|${i.monoId}`
                  )
                  if (index !== -1) {
                    onPress(index)
                    feedback(true)
                  }
                }}
              >
                <Flex style={styles.item} direction='column'>
                  <Flex style={styles.bar} direction='column' justify='end'>
                    <Text type='tinygrailText' size={9}>
                      {item.amount < 0 ? '-' : ''}
                      {formatNumber(Math.abs(item.amount), 0, true)}
                    </Text>
                    <View
                      style={[
                        styles.progress,
                        {
                          height: `${Math.max(
                            (Math.abs(item.amount) / (item.type === 0 ? max : min)) * 100,
                            10
                          )}%`,
                          backgroundColor: item.type === 0 ? _.colorBid : _.colorAsk
                        }
                      ]}
                    />
                  </Flex>
                  <Avatar
                    key={item.icon}
                    src={tinygrailOSS(item.icon)}
                    name={item.name}
                    size={22}
                    borderColor='transparent'
                    skeletonType='tinygrail'
                  />
                </Flex>
              </Touchable>
            ))}
          </Flex>
        </ScrollView>
      </View>
    )
  })
}

export default Chart
