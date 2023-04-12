/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 01:31:38
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { stl, toFixed } from '@utils'
import { memo } from '@utils/decorators'
import { getHeight, getDeviation, getDispute } from './utils'
import { DEFAULT_PROPS, DEFAULT_RATES } from './ds'

export default memo(
  ({ navigation, styles, friend, rating, total, count, score, toRating }) => {
    // global.rerender('Subject.Rating.Chart.Main')

    const deviation = getDeviation(total, count, score)
    const _count = Object.keys(count).length ? count : DEFAULT_RATES
    return (
      <>
        {!!total && (
          <Text style={styles.total} size={11} type='sub'>
            {total} 人评分
          </Text>
        )}
        <Flex style={styles.chart}>
          {Object.keys(_count)
            .reverse()
            .map((item, index) => {
              const height = getHeight(total, _count[item])

              // @ts-expect-error
              const isActive = rating == item
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
                      size={10}
                      type={isActive ? 'warning' : 'sub'}
                      align='center'
                      bold
                    >
                      {_count[item]}{' '}
                    </Text>
                  </Flex>
                  <Text
                    style={_.mt.sm}
                    size={12}
                    type={isActive ? 'warning' : 'title'}
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
            <Touchable
              style={styles.friend}
              onPress={() => toRating(navigation, '评分分布')}
            >
              <Flex>
                {friend.score ? (
                  <Text size={12} type='sub'>
                    好友
                    <Text size={12} type='main' bold>
                      {' '}
                      {friend.score}{' '}
                    </Text>
                    <Text size={12} lineHeight={12} type='sub'>
                      ({friend.total})
                    </Text>
                  </Text>
                ) : (
                  <Text size={12} lineHeight={12} type='sub'>
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
                message: [
                  '0-1 异口同声',
                  '1.15 基本一致',
                  '1.3 略有分歧',
                  '1.45 莫衷一是',
                  '1.6 各执一词',
                  '1.75 你死我活'
                ]
              })
            }}
          >
            <Flex>
              <Text size={12} type='sub'>
                标准差
              </Text>
              <Text size={12} type='main' bold>
                {' '}
                {toFixed(deviation, 2)}{' '}
              </Text>
              <Text size={12} lineHeight={12} type='sub'>
                {getDispute(deviation)}{' '}
              </Text>
              <Iconfont style={_.ml.xs} name='md-info-outline' size={16} />
            </Flex>
          </Touchable>
        </Flex>
      </>
    )
  },
  DEFAULT_PROPS
)
