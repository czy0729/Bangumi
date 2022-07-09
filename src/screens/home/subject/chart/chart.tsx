/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-09 16:38:59
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { memo } from '@utils/decorators'
import { alert } from '@utils/ui'
import { getHeight, getDeviation, getDispute } from './utils'

const defaultProps = {
  navigation: {},
  styles: {},
  friend: {},
  rating: 0,
  total: 0,
  count: {},
  score: 0,
  toRating: () => {}
}

const Chart = memo(
  ({ navigation, styles, friend, rating, total, count, score, toRating }) => {
    global.rerender('Subject.Rating.Chart.Main')

    const deviation = getDeviation(total, count, score)
    return (
      <>
        {!!total && (
          <Text style={styles.total} size={11} type='sub'>
            {total}人评分
          </Text>
        )}
        <Flex style={styles.chart}>
          {Object.keys(count)
            .reverse()
            .map((item, index) => {
              const height = getHeight(total, count[item])
              const isActive = rating == item
              return (
                <Flex.Item key={item} style={index > 0 && _.ml.xs}>
                  <Flex style={styles.item} justify='center' align='end'>
                    <View
                      style={[
                        styles.itemFill,
                        isActive && styles.itemFillActive,
                        {
                          height
                        }
                      ]}
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
                      {count[item]}{' '}
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
            onPress={() =>
              alert(
                '0-1 异口同声\n1.15 基本一致\n1.3 略有分歧\n1.45 莫衷一是\n1.6 各执一词\n1.75 你死我活',
                '标准差'
              )
            }
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
              <Iconfont name='md-info-outline' size={16} />
            </Flex>
          </Touchable>
        </Flex>
      </>
    )
  },
  defaultProps
)

export default Chart
