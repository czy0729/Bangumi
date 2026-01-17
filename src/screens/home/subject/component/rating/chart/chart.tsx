/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 07:00:18
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl, toFixed } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_FN, FROZEN_OBJECT } from '@constants'
import VibTrend from '../vib-trend'
import { getDeviation, getDispute, getHeight } from './utils'
import { COMPONENT_MAIN, DEFAULT_PROPS, DEFAULT_RATES, MESSAGES } from './ds'

const Chart = memo(
  ({
    navigation,
    styles,
    friend,
    rating = 0,
    total = 0,
    count = FROZEN_OBJECT,
    score = 0,
    toRating = FROZEN_FN
  }) => {
    const deviation = getDeviation(total, count, score)
    const countMap = Object.keys(count).length ? count : DEFAULT_RATES

    return (
      <>
        {!!total && (
          <Text style={styles.total} type='sub' size={12}>
            {total} votes
          </Text>
        )}

        <Flex style={styles.chart}>
          {Object.keys(countMap)
            .reverse()
            .map((key, index) => {
              const item = Number(key)
              const height = getHeight(total, countMap[item]) || 0
              const isActive = rating === item

              return (
                <Flex.Item key={item} style={index > 0 && _.ml.xs}>
                  <Flex style={styles.item} justify='center' align='end'>
                    <View
                      style={stl(styles.itemFill, isActive && styles.itemFillActive, {
                        height
                      })}
                    />
                    <Text
                      style={[
                        styles.count,
                        {
                          bottom: height
                        }
                      ]}
                      type={isActive ? 'warning' : 'sub'}
                      size={10}
                      align='center'
                      bold
                    >
                      {countMap[item]}{' '}
                    </Text>
                  </Flex>
                  <Text
                    style={_.mt.sm}
                    type={isActive ? 'warning' : 'title'}
                    size={12}
                    align='center'
                  >
                    {item}
                  </Text>
                </Flex.Item>
              )
            })}
        </Flex>

        <Flex style={_.mt.md}>
          <Flex.Item>
            <Touchable style={styles.friend} onPress={() => toRating(navigation, '评分分布')}>
              <Flex>
                {Number(friend?.score || 0) ? (
                  <Text type='sub' size={12}>
                    好友
                    <Text type='main' size={12}>
                      {' '}
                      {friend?.score || 0}{' '}
                    </Text>
                    <Text type='sub' size={12} lineHeight={12}>
                      ({friend?.total || 0})
                    </Text>
                  </Text>
                ) : (
                  <Text type='sub' size={12} lineHeight={12}>
                    用户评分
                  </Text>
                )}
                <Iconfont name='md-navigate-next' />
              </Flex>
              <Heatmap id='条目.跳转' from='评分分布' />
            </Touchable>
          </Flex.Item>

          <Touchable
            style={styles.deviation}
            onPress={() => {
              navigation.push('Information', {
                title: '标准差',
                message: MESSAGES
              })
            }}
          >
            <Flex>
              <Text type='sub' size={12}>
                标准差
              </Text>
              <Text type='main' size={12}>
                {' '}
                {toFixed(deviation, 2)}{' '}
              </Text>
              <Text type='sub' size={12} lineHeight={12}>
                {getDispute(deviation)}{' '}
              </Text>
            </Flex>
          </Touchable>

          <VibTrend />
        </Flex>
      </>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Chart
